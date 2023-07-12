import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { ERROR_RESULT, EventResult } from "./common";
import { processEvent as processEventContact } from "./contact";
import { processEvent as processEventMemorialWall } from "./memorial-wall";

async function processEvent(event: APIGatewayProxyEvent): Promise<EventResult> {
  try {
    switch (event.requestContext.path) {
      case "/contact":
        return processEventContact(event);
      case "/memorial-wall":
        return processEventMemorialWall(event);
      default:
        return {
          statusCode: 404,
          reason: "API Handler not found",
        };
    }
  } catch (e) {
    console.error("Error processing request in specific handler", e);

    return ERROR_RESULT;
  }
}

/**
 * Using a variable for this to get type safety that this is a well defined
 * method that matches the expected Lambda format (APIGatewayProxyHandler).
 */
// eslint-disable-next-line func-style
const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
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
