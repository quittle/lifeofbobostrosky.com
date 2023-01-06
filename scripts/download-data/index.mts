import { downloadMemorialWall, downloadUpdates } from "./download.mjs";
import {
  generateMemorialWallReport,
  generateUpdatesReport,
} from "./report.mjs";
import AWS from "aws-sdk";
import process from "process";

const STACK_NAME = "lifeofbobostrosky-com";

async function main() {
  AWS.config.update({ region: "us-east-1" });
  const stackName = process.env["STACK_NAME"] ?? STACK_NAME;

  const cloudformation = new AWS.CloudFormation();
  await Promise.all([
    downloadUpdates(stackName, cloudformation),
    downloadMemorialWall(stackName, cloudformation),
  ]);

  await Promise.all([
    generateMemorialWallReport(stackName),
    generateUpdatesReport(stackName),
  ]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
