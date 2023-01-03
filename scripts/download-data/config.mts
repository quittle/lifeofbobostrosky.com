import { promises as fs } from "fs";
import os from "os";
import path from "path";

export enum Resource {
  UpdatesTable = "UpdatesTable",
  MemorialWallTable = "MemorialWallTable",
  MemorialWallBucket = "MemorialWallBucket",
}

export async function getStorageFolder(stackName: string): Promise<string> {
  const folder = path.join(os.homedir(), "Downloads", `${stackName}-download`);
  await fs.mkdir(folder, { recursive: true });
  return folder;
}

export async function getMemorialWallFolder(
  stackName: string
): Promise<string> {
  const folder = path.join(await getStorageFolder(stackName), "memorial-wall");
  fs.mkdir(folder, { recursive: true });
  return folder;
}

export async function getMemorialWallFile(stackName: string): Promise<string> {
  return path.join(await getStorageFolder(stackName), "memorial-wall.json");
}

export async function getMemorialWallReportFile(
  stackName: string
): Promise<string> {
  return path.join(await getStorageFolder(stackName), "memorial-wall.html");
}
