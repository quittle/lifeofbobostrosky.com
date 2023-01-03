import { fileTypeFromFile } from "file-type";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import path from "path";

export function assertNotNull<T>(
  value: T,
  errorMessage?: string
): NonNullable<T> {
  if (value !== null && value !== undefined) {
    return value;
  }

  throw new Error("Value was null: " + errorMessage);
}

export async function getFileDetails(
  filePath: string
): Promise<{ extension: string; mimeType: string } | null> {
  const result = await fileTypeFromFile(filePath);
  if (result !== undefined) {
    return { extension: result.ext, mimeType: result.mime };
  }

  let fileContents;
  try {
    fileContents = await fs.readFile(filePath, { encoding: "utf8" });
  } catch (e) {
    return null;
  }

  const normalizedSvgContents = fileContents.trim().toLowerCase();
  if (
    normalizedSvgContents.startsWith("<svg") ||
    normalizedSvgContents.startsWith("<!--") ||
    normalizedSvgContents.startsWith("<?xml")
  ) {
    return {
      extension: "svg",
      mimeType: "image/svg+xml",
    };
  }

  return null;
}

export function getProjectRootDirectory(): string {
  const curFile = fileURLToPath(import.meta.url);
  return path.dirname(path.dirname(path.dirname(curFile)));
}
