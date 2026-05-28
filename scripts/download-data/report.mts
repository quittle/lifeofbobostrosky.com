import {
  assertNotNull,
  getFileDetails,
  getProjectRootDirectory,
} from "./utils.mjs";
import {
  getMemorialWallFile,
  getMemorialWallFolder,
  getMemorialWallReportFile,
  getUpdatesFile,
  getUpdatesReportFile,
} from "./config.mjs";
import SPAM_IDS from "./spam-ids.mjs";
import { deepStrictEqual } from "assert";
import { promises as fs } from "fs";
import path from "path";

function FilterById(entry: { id: string | undefined }): boolean {
  return !SPAM_IDS.has(entry.id ?? "no id provided");
}

function SortBySubmissionTime(
  a: { timeSubmitted: Date },
  b: { timeSubmitted: Date },
): number {
  return b.timeSubmitted.valueOf() - a.timeSubmitted.valueOf();
}

function FilterDuplicates(
  entry: AWS.DynamoDB.AttributeMap,
  index: number,
  array: readonly AWS.DynamoDB.AttributeMap[],
): boolean {
  function cleanEntry(
    entryToClean: AWS.DynamoDB.AttributeMap,
  ): AWS.DynamoDB.AttributeMap {
    const entryClone = { ...entryToClean };
    delete entryClone["timeSubmitted"];
    delete entryClone["id"];
    if ("files" in entryClone) {
      entryClone["files"] = { SS: [String(entryClone["files"].SS?.length)] };
    }
    return entryClone;
  }
  const entryClone = cleanEntry(entry);
  const match = array.find((other, otherIndex): boolean => {
    if (otherIndex <= index) {
      return false;
    }
    try {
      deepStrictEqual(entryClone, cleanEntry(other));
      return true;
    } catch (_e) {
      return false;
    }
  });
  return match === undefined;
}

async function parseDynamoDbAttributeMapFile(
  file: string,
): Promise<AWS.DynamoDB.AttributeMap[]> {
  const contents = await fs.readFile(file, { encoding: "utf8" });
  return JSON.parse(contents) as AWS.DynamoDB.AttributeMap[];
}

async function getHtmlTemplate(): Promise<string> {
  const indexFilePath = path.join(
    getProjectRootDirectory(),
    "scripts",
    "download-data",
    "index.html",
  );
  const contents = await fs.readFile(indexFilePath, {
    encoding: "utf8",
  });
  return contents;
}

async function generateReport(
  outFile: string,
  title: string,
  entries: string[],
): Promise<void> {
  const htmlTemplate = await getHtmlTemplate();

  const fullHtml = htmlTemplate
    .replaceAll("{{TITLE}}", title)
    .replaceAll("{{DATA}}", JSON.stringify(entries));

  await fs.writeFile(outFile, fullHtml, { flag: "w+" });
  console.log("Created report:", outFile);
}

/**
 * You can't have an empty StringSet in DynamoDB due to how storage works. "Empty" sets actually
 * contain a single entry, an empty string. This handles that case and normalizes to what you would
 * actually expect.
 */
function cleanStringSet(set: string[] | undefined): string[] {
  if (!set) {
    return [];
  }
  if (set.length === 1 && set[0] === "") {
    return [];
  }
  return set;
}

export async function generateMemorialWallReport(
  stackName: string,
): Promise<void> {
  const parsedContents = await parseDynamoDbAttributeMapFile(
    await getMemorialWallFile(stackName),
  );

  const entries = parsedContents
    .filter(FilterDuplicates)
    .map((entry) => ({
      timeSubmitted: new Date(entry["timeSubmitted"]?.S ?? ""),
      date: entry["date"].S,
      location: entry["location"].S,
      files: cleanStringSet(entry["files"].SS),
      contact: entry["contact"].S,
      memory: entry["memory"].S,
      name: entry["name"].S,
      id: entry["id"].S,
    }))
    .filter(FilterById)
    .sort(SortBySubmissionTime);

  const memorialWallFolder = await getMemorialWallFolder(stackName);

  async function makeImage(file: string): Promise<string> {
    const filePath = path.join(memorialWallFolder, file);
    const details = await getFileDetails(filePath);
    const encodedFile = (await fs.readFile(filePath)).toString("base64");

    return `<img src="data:${
      assertNotNull(details).mimeType
    };base64, ${encodedFile}" title="${file}" />`;
  }

  await generateReport(
    await getMemorialWallReportFile(stackName),
    "Memorial Wall",
    await Promise.all(
      entries.map(
        async ({ id, name, date, files, contact, location, memory }) =>
          `
            <div>From: <b>${name}</b> ${contact && `&lt;${contact}&gt;`}</div>
            <div>Memory
                ${location && `from ${location}`}
                ${date && `on ${date}`}
            </div>
            <blockquote>${memory}</blockquote>
            <div>
                ${(await Promise.all(files?.map(makeImage) ?? [])).join("")}
            </div>
            <div>Id: <span class="copyable" title="Click to copy">${id}</span></div>
            `,
      ),
    ),
  );
}

export async function generateUpdatesReport(stackName: string): Promise<void> {
  const parsedContents = await parseDynamoDbAttributeMapFile(
    await getUpdatesFile(stackName),
  );

  const entries = parsedContents
    .filter(FilterDuplicates)
    .map((entry) => ({
      timeSubmitted: new Date(entry["timeSubmitted"]?.S ?? ""),
      message: entry["message"].S,
      address: entry["address"].S,
      email: entry["email"].S,
      phone: entry["phone"].S,
      name: entry["name"].S,
      id: entry["id"].S,
    }))
    .filter(FilterById)
    .sort(SortBySubmissionTime);

  await generateReport(
    await getUpdatesReportFile(stackName),
    "Updates",
    entries.map(
      ({ id, name, phone, email, address, message }) =>
        `
            <div>From: <b>${name}</b></div>
            ${phone && `<div>Phone: ${phone}</div>`}
            ${email && `<div>Email: ${email}</div>`}
            ${address && `<div>Address: ${address}</div>`}
            ${
              message &&
              `
                <div>
                    Message:
                    <blockquote>
                        ${message}
                    </blockquote>
                </div>
              `
            }
            <div>Id: <span class="copyable">${id}</span></div>
        `,
    ),
  );
}

export async function generateContactReport(stackName: string) {
  const [memorialWallFileContents, updatesFileContents] = await Promise.all([
    getMemorialWallFile(stackName).then(parseDynamoDbAttributeMapFile),
    getUpdatesFile(stackName).then(parseDynamoDbAttributeMapFile),
  ]);

  const allContents = memorialWallFileContents.concat(updatesFileContents);

  const contacts = allContents
    .filter(FilterDuplicates)
    .map((entry) => ({
      email: entry["email"]?.S,
      phone: entry["phone"]?.S,
      name: entry["name"].S as string,
      contact: entry["contact"]?.S,
      id: entry["id"]?.S,
    }))
    .filter(FilterById)
    .reduce(
      (prev, { email, phone, name, contact }) => {
        if (!(name in prev)) {
          prev[name] = { email: new Set(), phone: new Set() };
        }
        if (email) {
          prev[name].email.add(email);
        }
        if (phone) {
          prev[name].phone.add(phone);
        }
        if (contact) {
          if (contact.includes("@")) {
            prev[name].email.add(contact);
          } else {
            prev[name].phone.add(contact);
          }
        }
        return prev;
      },
      {} as { [name: string]: { email: Set<string>; phone: Set<string> } },
    );

  const emails = new Set<string>();
  const missingContacts = [];

  for (const [name, { email, phone }] of Object.entries(contacts)) {
    if (email.size > 0) {
      for (const entry of email) {
        emails.add(entry);
      }
    } else {
      missingContacts.push({ name, phone: Array.from(phone) });
    }
  }

  console.log("Email to:", Array.from(emails).join(";"));
  console.log("Non-emailable contacts", missingContacts);
}
