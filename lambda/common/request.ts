import { APIGatewayProxyEvent } from "aws-lambda";

export function parseRequest<T>(
  event: APIGatewayProxyEvent,
  parse: (_params: URLSearchParams) => Promise<T>
): Promise<T> {
  const { body } = event;
  if (!body) {
    throw new Error("Missing body of request");
  }

  const response = new URLSearchParams(body);

  return parse(response);
}
