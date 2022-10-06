import { APIGatewayProxyEvent } from "aws-lambda";
import { checkRecaptchaResponse } from "../common/recaptcha";
import { parseRequest } from "../common/request";

export type ContactFormData = {
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  message: string;
};

export function handleRequest(
  event: APIGatewayProxyEvent
): Promise<ContactFormData> {
  return parseRequest(event, async (response) => {
    const name = response.get("name");
    const email = response.get("email");
    const phone = response.get("phone");
    const address = response.get("address");
    const message = response.get("message") ?? "No message submitted.";
    const gRecaptchaResponse = response.get("g-recaptcha-response");

    if (!(name && (email || phone))) {
      throw new Error("A required field was missing from the submission.");
    }

    await checkRecaptchaResponse(event, gRecaptchaResponse);

    return {
      name,
      email,
      phone,
      address,
      message,
    };
  });
}
