import { addRecaptchaToFormData } from "./recaptcha";
import { multipartFormEncode } from "./form-utils";
import sections from "../sections";

function getContactForm(): HTMLFormElement {
  return document.getElementById("contact-form") as HTMLFormElement;
}

export function initContactForm() {
  const contactForm = getContactForm();
  contactForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const data = new FormData(contactForm);
    await addRecaptchaToFormData(data, sections.updates.id);

    const body = multipartFormEncode(data);
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body,
    });

    let result;
    try {
      const json = await response.json();
      // eslint-disable-next-line prefer-destructuring
      result = json["result"];
    } catch (e) {
      result = `Error: ${e}`;
    }

    const resultDiv = document.getElementById(
      "submission-result"
    ) as HTMLElement;
    if (response.ok) {
      resultDiv.classList.remove("error");
      resultDiv.classList.add("success");
    } else {
      resultDiv.classList.remove("success");
      resultDiv.classList.add("error");
      (resultDiv.querySelector(".error-message") as HTMLElement).innerText =
        result || "Error. Try refreshing";
    }
    try {
      resultDiv.scrollIntoView({
        block: "end",
        inline: "end",
      });
    } catch (_e) {
      // Swallow exception if not supported
    }
    resultDiv.focus();
  });
}
