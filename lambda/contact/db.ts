import { ContactFormData } from "./request";
import DynamoDB from "aws-sdk/clients/dynamodb";
import { dynamoDBClient } from "../common/aws";
import { getDynamoDBTableName } from "../common";
import { randomUUID } from "crypto";

export async function saveToTable(args: ContactFormData): Promise<void> {
  const params: DynamoDB.Types.PutItemInput = {
    TableName: getDynamoDBTableName(),
    Item: {
      id: {
        S: randomUUID(),
      },
      timeSubmitted: {
        S: new Date().toISOString(),
      },
      name: {
        S: args.name,
      },
      email: {
        S: args.email ?? "",
      },
      phone: {
        S: args.phone ?? "",
      },
      address: {
        S: args.address ?? "",
      },
      message: {
        S: args.message,
      },
    },
  };

  await dynamoDBClient.putItem(params).promise();
}
