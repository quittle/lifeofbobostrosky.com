import process from "process";

export function expectNonNull<T>(value: T | null | undefined): T {
  if (value !== null && value !== undefined) {
    return value;
  }
  throw new Error(`Expected non-null but received ${value}`);
}

export function getDynamoDBTableName(): string {
  return expectNonNull(process.env["DYNAMO_DB_TABLE_NAME"]);
}

export function getS3BucketName(): string {
  return expectNonNull(process.env["S3_BUCKET_NAME"]);
}

export interface EventResult {
  statusCode: number;
  reason:
    | string
    | Readonly<Record<string, unknown>>
    | readonly Record<string, unknown>[];
}

export const ERROR_RESULT: Readonly<EventResult> = {
  statusCode: 500,
  reason: "Server Error. Try again later.",
};
