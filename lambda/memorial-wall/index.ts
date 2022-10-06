import { ERROR_RESULT, EventResult, getS3BucketName } from "../common";
import { MemorialWallFormData, handleRequest } from "./request";
import { APIGatewayProxyEvent } from "aws-lambda";
import { s3Client } from "../common/aws";
import { saveToTable } from "./db";
import { sendEmail } from "../common/email";

function generatePresignedUrls(
  fileNames: readonly string[]
): readonly Record<string, unknown>[] {
  return fileNames.map(
    (fileName) =>
      s3Client.createPresignedPost({
        Bucket: getS3BucketName(),
        Fields: {
          key: fileName,
        },
        Conditions: [
          // 1 byte to 20 megabytes in size
          ["content-length-range", 1, 20_000_000],
        ],
        // 3 minute expiry
        Expires: 3 * 60,
      }) as never
  );
}

export async function processEvent(
  event: APIGatewayProxyEvent
): Promise<EventResult> {
  let formData: MemorialWallFormData;
  try {
    formData = await handleRequest(event);
  } catch (e) {
    console.warn("Unable to parse request", e);
    return {
      statusCode: 400,
      reason: (e as Error).message,
    };
  }

  let presignedUrls;
  try {
    presignedUrls = await generatePresignedUrls(formData.files);
  } catch (e) {
    console.error("Unable to save to generate presigned URLs", e);
    return ERROR_RESULT;
  }

  try {
    await saveToTable(formData);
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
            From: ${formData.name} <Contact:${formData.contact}>
            Memory >>>
            ${formData.memory}
            <<<<<<<<<<<
        `,
    });
  } catch (e) {
    console.error("Unable to send email", e);

    return ERROR_RESULT;
  }

  return {
    statusCode: 200,
    reason: presignedUrls,
  };
}
