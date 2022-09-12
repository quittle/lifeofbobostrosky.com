import { DynamoDB } from "aws-sdk";
import { randomUUID } from "crypto";

const dynamoDBClient = new DynamoDB();

export async function saveToTable(
  tableName: string,
  args: {
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    message: string;
  }
): Promise<void> {
  const params: DynamoDB.Types.PutItemInput = {
    TableName: tableName,
    Item: {
      id: {
        S: randomUUID(),
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
