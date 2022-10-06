import type { PresignedPost } from "aws-sdk/clients/s3";
import { submitFormWithRecaptchaForResult } from "./form-utils";

function getMemorialWallForm(): HTMLFormElement {
  return document.getElementById("memorial-wall-form") as HTMLFormElement;
}

function getMemorialWallFormSubmitButton(): HTMLButtonElement {
  return document.querySelector(
    "#memorial-wall-form button[type=submit]"
  ) as HTMLButtonElement;
}

function setResult(resultSuccess: boolean | null, message: string) {
  const memorialWallForm = getMemorialWallForm();

  getMemorialWallFormSubmitButton().disabled = false;

  memorialWallForm.classList.toggle("submit-error", !(resultSuccess ?? true));
  memorialWallForm.classList.toggle("submit-success", resultSuccess ?? false);
  memorialWallForm
    .querySelectorAll("aside")
    .forEach((aside) => (aside.innerText = message));
}

/**
 * Attempts to upload files using the presigned post request, returning error messages if there were any errors.
 * @param presignedPostRequests The presigned post requests to use.
 * @param files The files to upload.
 * @returns An array of errors. If successful, this array is empty.
 */
async function uploadFiles(
  presignedPostRequests: readonly PresignedPost[],
  files: readonly File[]
): Promise<readonly string[]> {
  if (presignedPostRequests.length !== files.length) {
    return ["Server error uploading files"];
  }

  const uploadResponses: Response[] = await Promise.all(
    presignedPostRequests.map((presignedPost: PresignedPost, index: number) => {
      const file = files[index];
      const formData = new FormData();
      Object.entries(presignedPost.fields).forEach(([k, v]) => {
        formData.append(k, v);
      });
      formData.append("file", file); // Must be the last one
      return fetch(presignedPost.url, {
        method: "POST",
        body: formData,
      });
    })
  );

  const errors = await Promise.all(
    uploadResponses
      .filter((response) => !response.ok)
      .map((response) => response.text())
  );

  return errors;
}

// eslint-disable-next-line max-lines-per-function
export function initMemorialWall() {
  const memorialWallForm = getMemorialWallForm();
  memorialWallForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    getMemorialWallFormSubmitButton().disabled = true;

    const data = new FormData(memorialWallForm);
    const files = data.getAll("files") as File[];
    // If no files were submitted, then a single file with an empty name will be present.
    if (files.length === 1 && files[0].name === "") {
      files.pop();
    }
    data.append("filesCount", String(files.length));
    data.delete("files");

    for (const file of files) {
      if (file.size > 20_000_000) {
        setResult(false, "Attachments must be less than 20 MB.");
        return;
      }
    }

    let result;
    try {
      result = (await submitFormWithRecaptchaForResult(
        memorialWallForm,
        data
      )) as PresignedPost[];
    } catch (e) {
      setResult(false, `Error: ${e}`);
      return;
    }

    let uploadFileErrors;
    try {
      uploadFileErrors = await uploadFiles(result, files);
    } catch (e) {
      setResult(false, `Error: ${e}`);
      return;
    }

    if (uploadFileErrors.length > 0) {
      setResult(false, uploadFileErrors.join(". "));
    } else {
      setResult(true, "Submission successful");
    }
  });
}
