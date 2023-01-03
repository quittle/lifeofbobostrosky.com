import {
  assertNotNull,
  getFileDetails,
  getProjectRootDirectory,
} from "./utils.mjs";
import {
  getMemorialWallFile,
  getMemorialWallFolder,
  getMemorialWallReportFile,
} from "./config.mjs";
import { promises as fs } from "fs";
import path from "path";

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
export async function generateReport(stackName: string): Promise<void> {
  const memorialWallFile = await getMemorialWallFile(stackName);
  const contents = await fs.readFile(memorialWallFile, { encoding: "utf8" });
  const parsedContents = JSON.parse(contents) as AWS.DynamoDB.AttributeMap[];

  interface Entry {
    timeSubmitted: Date;
    date: string | undefined;
    location: string | undefined;
    files: string[] | undefined;
    contact: string | undefined;
    memory: string | undefined;
    name: string | undefined;
    id: string | undefined;
  }
  const entries: Entry[] = parsedContents.map((entry) => ({
    timeSubmitted: new Date(entry["timeSubmitted"]?.S ?? ""),
    date: entry["date"].S,
    location: entry["location"].S,
    files: entry["files"].SS,
    contact: entry["contact"].S,
    memory: entry["memory"].S,
    name: entry["name"].S,
    id: entry["id"].S,
  }));

  const memorialWallFolder = await getMemorialWallFolder(stackName);

  async function makeImage(file: string): Promise<string> {
    const filePath = path.join(memorialWallFolder, file);
    const details = await getFileDetails(filePath);
    const encodedFile = (await fs.readFile(filePath)).toString("base64");

    return `<img src="data:${
      assertNotNull(details).mimeType
    };base64, ${encodedFile}" title="${file}" />`;
  }

  const htmlTemplate = await getHtmlTemplate();

  const fullHtml = htmlTemplate
    .replaceAll("{{TITLE}}", "Memorial Wall")
    .replaceAll(
      "{{DATA}}",
      JSON.stringify(
        await Promise.all(
          entries.map(
            async ({ name, date, files, contact, location, memory }) =>
              `
              <div>From: <b>${name}</b> ${contact && `&lt;${contact}&gt;`}</div>
              <div>Memory ${location && `from ${location}`} ${
                date && `on ${date}`
              }</div>
              <blockquote>${memory}</blockquote>
              <div>
              ${(await Promise.all(files?.map(makeImage) ?? [])).join("")}
              </div>
              `
          )
        )
      )
    );

  const outReportHtmlFile = await getMemorialWallReportFile(stackName);
  await fs.writeFile(outReportHtmlFile, fullHtml, { flag: "w+" });
  console.log("Created report", outReportHtmlFile);
}
