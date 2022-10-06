import DynamoDB from "aws-sdk/clients/dynamodb";
import S3 from "aws-sdk/clients/s3";

export const dynamoDBClient = new DynamoDB();
export const s3Client = new S3();
