import { APIGatewayProxyEvent } from "aws-lambda";
import { checkRecaptchaResponse } from "../common/recaptcha";
import crypto from "crypto";
import { parseRequest } from "../common/request";

export type MemorialWallFormData = {
  name: string;
  contact: string | null;
  memory: string;
  location: string | null;
  date: string | null;
  files: readonly string[];
};

export function handleRequest(
  event: APIGatewayProxyEvent
): Promise<MemorialWallFormData> {
  return parseRequest(event, async (response) => {
    const name = response.get("name");
    const contact = response.get("contact");
    const memory = response.get("memory");
    const location = response.get("location");
    const date = response.get("date");
    // Handle both missing entries and invalid numbers
    const filesCount = parseInt(response.get("filesCount") ?? "0", 10) ?? 0;
    const files = Array.from({ length: filesCount }, () => crypto.randomUUID());

    if (!name || !memory) {
      throw new Error("A required field was missing from the submission.");
    }

    const gRecaptchaResponse = response.get("g-recaptcha-response");

    await checkRecaptchaResponse(event, gRecaptchaResponse);

    return {
      name,
      contact,
      memory,
      location,
      date,
      files,
    };
  });
}
