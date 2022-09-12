import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { parseRequest } from "./request";
import process from "process";
import { saveToTable } from "./db";
import { sendEmail } from "./email";

function getDynamoDBTableName(): string {
  return process.env["DYNAMO_DB_TABLE_NAME"] as string;
}

interface EventResult {
  statusCode: number;
  reason: string;
}

const ERROR_RESULT: Readonly<EventResult> = {
  statusCode: 500,
  reason: "Server Error. Try again later.",
};

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
    await saveToTable(getDynamoDBTableName(), formData);
  } catch (e) {
    console.error("Unable to save to table", e);

    return ERROR_RESULT;
  }

  try {
    await sendEmail({
      toAddress: "quittleland@gmail.com",
      fromAddress: "api+updates@lifeofbobostrosky.com",
      replyToAddress: "noreply@lifeofbobostrosky.com",
      subject: "Updates Form Submission - lifeofbobostrosky.com",
      body: `
            From: ${formData.name} <Email:${formData.email}> <Phone:${formData.phone}> <Address:${formData.address}>
            Message >>>
            ${formData.message}
            <<<<<<<<<<<
        `,
    });
  } catch (e) {
    console.error("Unable to send email", e);

    return ERROR_RESULT;
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
