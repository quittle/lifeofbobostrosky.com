import { ContactFormData, handleRequest } from "./request";
import { ERROR_RESULT, EventResult } from "../common";
import { APIGatewayProxyEvent } from "aws-lambda";
import { saveToTable } from "./db";
import { sendEmail } from "../common/email";

export async function processEvent(
  event: APIGatewayProxyEvent
): Promise<EventResult> {
  let formData: ContactFormData;
  try {
    formData = await handleRequest(event);
  } catch (e) {
    console.warn("Unable to parse request", e);
    return {
      statusCode: 400,
      reason: (e as Error).message,
    };
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
            From: ${formData.name} <Email:${formData.email}> <Phone:${formData.phone}> <Address:${formData.address}>
            Message >>>
            ${formData.message}
            <<<<<<<<<<<
        `,
    });
  } catch (e) {
    console.error("Unable to send email", e);

    return ERROR_RESULT;
  }

  return {
    statusCode: 200,
    reason: "Submitted Successfully.",
  };
}
