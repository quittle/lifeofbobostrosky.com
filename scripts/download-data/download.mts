import * as fsSync from "fs";
import {
  Resource,
  getMemorialWallFile,
  getMemorialWallFolder,
  getStorageFolder,
} from "./config.mjs";
import { assertNotNull, getFileDetails } from "./utils.mjs";
import AWS from "aws-sdk";
const { S3 } = AWS;
import { promises as fs } from "fs";
import path from "path";

async function scanTable(
  params: AWS.DynamoDB.ScanInput
): Promise<AWS.DynamoDB.AttributeMap[]> {
  const dynamodb = new AWS.DynamoDB();

  const scanResults: AWS.DynamoDB.AttributeMap[] = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const items = await dynamodb.scan(params).promise();
    if (items.$response.error) {
      throw items.$response.error;
    }
    items?.Items?.forEach((item) => scanResults.push(item));
    const lastEvaluatedKey = items?.LastEvaluatedKey;
    if (lastEvaluatedKey === undefined) {
      break;
    }
    // eslint-disable-next-line require-atomic-updates
    params.ExclusiveStartKey = lastEvaluatedKey;
  }
  return scanResults;
}

export async function downloadUpdates(
  stackName: string,
  cloudformation: AWS.CloudFormation
): Promise<void> {
  const update = await cloudformation
    .describeStackResource({
      StackName: stackName,
      LogicalResourceId: Resource.UpdatesTable,
    })
    .promise();
  const tableName = assertNotNull(
    update.StackResourceDetail?.PhysicalResourceId
  );

  const entries = await scanTable({ TableName: tableName });

  const updatesFile = path.join(
    await getStorageFolder(stackName),
    "updates.json"
  );

  const serializedUpdates = JSON.stringify(entries);
  await fs.writeFile(updatesFile, serializedUpdates);

  console.info(`Wrote ${serializedUpdates.length} chars to ${updatesFile}`);
}

async function downloadMemorialWallFile(
  stackName: string,
  bucketName: string,
  key: string
): Promise<void> {
  const folderName = await getMemorialWallFolder(stackName);
  const fileName = path.join(folderName, key);
  if (fsSync.existsSync(fileName)) {
    console.debug(`${fileName} already exists on disk.`);
    return;
  }

  console.info(`Downloading ${fileName} to disk.`);

  let object;
  try {
    object = await new S3()
      .getObject({ Bucket: bucketName, Key: key })
      .promise();
  } catch (err) {
    if (err instanceof Error && err.name === "NoSuchKey") {
      console.warn(`s3:\\${bucketName}/${fileName} does not exist`);
      await fs.writeFile(
        fileName,
        `This file did not exist at ${new Date().toLocaleString()}`
      );
      return;
    }
    throw err;
  }

  const bytes = assertNotNull(object.Body, "S3 object body null");
  await fs.writeFile(
    fileName,
    // @ts-expect-error Blob is incompatible
    bytes
  );

  const result = await getFileDetails(fileName);

  if (result === null) {
    console.warn(`Unable to determine the file type of ${fileName}`);
    return;
  }

  await fs.writeFile(
    `${fileName}.${result.extension}`,
    // @ts-expect-error Blob is incompatible
    bytes
  );
}

async function getMemorialWallBucketName(
  stackName: string,
  cloudformation: AWS.CloudFormation
): Promise<string> {
  const update = await cloudformation
    .describeStackResource({
      StackName: stackName,
      LogicalResourceId: Resource.MemorialWallBucket,
    })
    .promise();

  return assertNotNull(
    update.StackResourceDetail?.PhysicalResourceId,
    `Unable to find ${Resource.MemorialWallBucket}`
  );
}

export async function downloadMemorialWall(
  stackName: string,
  cloudformation: AWS.CloudFormation
): Promise<void> {
  const bucketName = await getMemorialWallBucketName(stackName, cloudformation);
  const update = await cloudformation
    .describeStackResource({
      StackName: stackName,
      LogicalResourceId: Resource.MemorialWallTable,
    })
    .promise();
  const tableName = assertNotNull(
    update.StackResourceDetail?.PhysicalResourceId
  );

  const entries = await scanTable({ TableName: tableName });

  const memorialWallFile = await getMemorialWallFile(stackName);

  const serializedUpdates = JSON.stringify(entries);
  await fs.writeFile(memorialWallFile, serializedUpdates);

  console.info(
    `Wrote ${serializedUpdates.length} chars to ${memorialWallFile}`
  );
  entries.flatMap((entry) =>
    assertNotNull(entry["files"].SS, "Required non-null string set")
      .filter((file) => file !== "")
      .map((file) => downloadMemorialWallFile(stackName, bucketName, file))
  );
}
