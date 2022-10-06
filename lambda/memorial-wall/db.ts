import DynamoDB from "aws-sdk/clients/dynamodb";
import { MemorialWallFormData } from "./request";
import { dynamoDBClient } from "../common/aws";
import { getDynamoDBTableName } from "../common";
import { randomUUID } from "crypto";

export async function saveToTable(args: MemorialWallFormData): Promise<void> {
  // Dynamo doesn't support an empty string set so we will use an empty string as an indicator
  const fileNames = [...args.files];
  if (fileNames.length === 0) {
    fileNames.push("");
  }

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
      contact: {
        S: args.contact ?? "",
      },
      memory: {
        S: args.memory,
      },
      location: {
        S: args.location ?? "",
      },
      date: {
        S: args.date ?? "",
      },
      files: {
        SS: fileNames,
      },
    },
  };

  await dynamoDBClient.putItem(params).promise();
}
