import { APIGatewayProxyEvent } from "aws-lambda";
import axios from "axios";

declare const RECAPTCHA_SECRET: string | undefined;

type RecaptchaError =
  | "missing-input-secret"
  | "invalid-input-secret"
  | "missing-input-response"
  | "invalid-input-response"
  | "bad-request"
  | "timeout-or-duplicate";

interface RecaptchaResponse {
  success: boolean;
  // Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  challenge_ts: string;
  // The hostname of the site where the reCAPTCHA was solved
  hostname: string;
  "error-codes": Array<RecaptchaError>;
}

async function checkRecaptchaResponse(
  event: APIGatewayProxyEvent,
  recaptchaValue: string | null,
): Promise<void> {
  if (!recaptchaValue) {
    console.warn("Skipping recaptcha check due to it missing");
  }

  const response = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    undefined,
    {
      params: {
        secret: RECAPTCHA_SECRET,
        response: recaptchaValue,
        remoteip: event.requestContext.identity.sourceIp,
      },
    },
  );

  if (response.status !== 200) {
    throw new Error(
      `Unable to verify captcha: ${JSON.stringify(response.data)}`,
    );
  }

  const recaptchaData = response.data as RecaptchaResponse;
  if (!recaptchaData.success) {
    throw new Error(
      `Captcha verification failed: ${JSON.stringify(
        recaptchaData["error-codes"],
      )}`,
    );
  }
}

export { checkRecaptchaResponse };
