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
import { deepStrictEqual } from "assert";
import { promises as fs } from "fs";
import path from "path";

const ID_FILTER: Set<string> = new Set([
  "77ef24f2-ea7e-4ae2-b1c6-2a319f778a42",
  "e968547a-5ede-44ea-81fe-be3e680a13ee",
  "4e6ccb23-ec56-45c0-b47a-db43a2a1a869",
  "bd71bc5b-9bb2-4a29-a7bc-096e79ba90fe",
  "a3d6e8fe-6081-488d-b705-20bea7c4b7d2",
  "36fd77c5-1de7-45a6-b200-43f5ca8a91e8",
  "cd7194b2-0b07-4284-8b38-cb2952305907",
  "67d70fb0-92f9-47bd-b141-3a1e0189882d",
  "71049788-b87e-448a-9b10-a8dd110f1fd6",
  "c5910cb5-e2f7-41c6-bce1-d776cb6c2015",
  "ff65e2d1-2a3c-4266-8689-ceefd2423b6d",
  "b3439927-324a-4dcd-9af1-c4a75d3b60ee",
  "cd4a9166-a44f-4967-b61d-27abf6b7d004",
  "1aec5f27-0650-4160-a994-8241c646d812",
  "2212357f-5c11-4b94-bdf1-10ed1acca2f6",
  "17e059ad-d042-4e39-8428-949c234dfa67",
  "971040d8-bede-44c4-8cca-8abed67f9d4d",
  "6fb447da-f778-4c80-b112-6fdfd7af9f75",
  "cd59bccd-bae3-46bb-8c45-f6caf0f8eccc",
]);

function FilterById(entry: { id: string | undefined }): boolean {
  return !ID_FILTER.has(entry.id ?? "no id provided");
}

function SortBySubmissionTime(
  a: { timeSubmitted: Date },
  b: { timeSubmitted: Date }
): number {
  return b.timeSubmitted.valueOf() - a.timeSubmitted.valueOf();
}

function FilterDuplicates(
  entry: AWS.DynamoDB.AttributeMap,
  index: number,
  array: readonly AWS.DynamoDB.AttributeMap[]
): boolean {
  function cleanEntry(
    entryToClean: AWS.DynamoDB.AttributeMap
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
    } catch (e) {
      return false;
    }
  });
  return match === undefined;
}

async function parseDynamoDbAttributeMapFile(
  file: string
): Promise<AWS.DynamoDB.AttributeMap[]> {
  const contents = await fs.readFile(file, { encoding: "utf8" });
  return JSON.parse(contents) as AWS.DynamoDB.AttributeMap[];
}

async function getHtmlTemplate(): Promise<string> {
  const indexFilePath = path.join(
    getProjectRootDirectory(),
    "scripts",
    "download-data",
    "index.html"
  );
  const contents = await fs.readFile(indexFilePath, {
    encoding: "utf8",
  });
  return contents;
}

async function generateReport(
  outFile: string,
  title: string,
  entries: string[]
): Promise<void> {
  const htmlTemplate = await getHtmlTemplate();

  const fullHtml = htmlTemplate
    .replaceAll("{{TITLE}}", title)
    .replaceAll("{{DATA}}", JSON.stringify(entries));

  await fs.writeFile(outFile, fullHtml, { flag: "w+" });
  console.log("Created report:", outFile);
}

export async function generateMemorialWallReport(
  stackName: string
): Promise<void> {
  const parsedContents = await parseDynamoDbAttributeMapFile(
    await getMemorialWallFile(stackName)
  );

  const entries = parsedContents
    .filter(FilterDuplicates)
    .map((entry) => ({
      timeSubmitted: new Date(entry["timeSubmitted"]?.S ?? ""),
      date: entry["date"].S,
      location: entry["location"].S,
      files: entry["files"].SS,
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
            <div>Id: <span class="copyable">${id}</span></div>
            `
      )
    )
  );
}

export async function generateUpdatesReport(stackName: string): Promise<void> {
  const parsedContents = await parseDynamoDbAttributeMapFile(
    await getUpdatesFile(stackName)
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
        `
    )
  );
}
