import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { parseRequest } from "./request";
import { sendEmail } from "./email";

interface EventResult {
  statusCode: number;
  reason: string;
}

async function processEvent(event: APIGatewayProxyEvent): Promise<EventResult> {
  let formData;
  try {
    formData = await parseRequest(event);
  } catch (e) {
    console.warn("Unable to parse request", e);
    return {
      statusCode: 400,
      reason: (e as Error).message,
    };
  }

  try {
    await sendEmail({
      toAddress: "quittleland@gmail.com",
      fromAddress: "api+updates@lifeofbobostrosky.com",
      replyToAddress: formData.email,
      subject: "Updates Form Submission - lifeofbobostrosky.com",
      body: `
            From: ${formData.name} <${formData.email}>
            Message >>>
            ${formData.message}
            <<<<<<<<<<<
        `,
    });
  } catch (e) {
    console.error("Unable to send email", e);

    return {
      statusCode: 500,
      reason: "Server Error. Try again later.",
    };
  }

  return {
    statusCode: 200,
    reason: "Submitted Successfully.",
  };
}

/**
 * Using a variable for this to get type safety that this is a well defined
 * method that matches the expected Lambda format.
 */
// eslint-disable-next-line func-style
const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Request Event", event);

  const result = await processEvent(event);

  const response: APIGatewayProxyResult = {
    body: JSON.stringify({ result: result.reason }),
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    },
    isBase64Encoded: false,
    statusCode: result.statusCode,
  };

  console.log("Response", response);

  return response;
};

export { handler };
