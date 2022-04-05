import { APIGatewayProxyEvent } from "aws-lambda";
import { checkRecaptchaResponse } from "./recaptcha";

type ContactFormData = {
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  gRecaptchaResponse: string | null;
};

async function parseRequest(
  event: APIGatewayProxyEvent
): Promise<ContactFormData> {
  const { body } = event;
  if (!body) {
    throw new Error("Missing body of request");
  }

  const response = new URLSearchParams(body);

  const name = response.get("name");
  const email = response.get("email");
  const phone = response.get("phone");
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
    message,
    gRecaptchaResponse,
  };
}

export { ContactFormData, parseRequest };
