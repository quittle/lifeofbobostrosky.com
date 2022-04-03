import { APIGatewayProxyEvent } from "aws-lambda";
import { checkRecaptchaResponse } from "./recaptcha";

type ContactFormData = {
  name: string;
  email: string;
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
  const message = response.get("message");
  const gRecaptchaResponse = response.get("g-recaptcha-response");

  if (!(name && email && message)) {
    throw new Error("A required field was missing from the request");
  }

  await checkRecaptchaResponse(event, gRecaptchaResponse);

  return {
    name,
    email,
    message,
    gRecaptchaResponse,
  };
}

export { ContactFormData, parseRequest };
