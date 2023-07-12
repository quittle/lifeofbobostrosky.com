import { addRecaptchaToFormData } from "./recaptcha";

export function multipartFormEncode(formData: FormData): string {
  return [...formData.entries()]
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
    )
    .join("&");
}

export async function submitFormWithRecaptchaForResult(
  form: HTMLFormElement,
  formData: FormData,
): Promise<unknown> {
  await addRecaptchaToFormData(formData, form.id.replaceAll("-", "_"));

  const body = multipartFormEncode(formData);
  const response = await fetch(form.action, {
    method: form.method,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body,
  });

  const json = await response.json();
  return json["result"];
}
