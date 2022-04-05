function getContactForm(): HTMLFormElement {
  return document.getElementById("contact-form") as HTMLFormElement;
}

function init() {
  const contactForm = getContactForm();
  contactForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(
        "6LcT-UEfAAAAALIl7NO1JPZvYuvVxDF6kyzYc1gH",
        {
          action: "submit_updates",
        }
      );

      const data = new FormData(contactForm);
      data.append("g-recaptcha-response", token);

      const body = [...data.entries()]
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
        )
        .join("&");
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
      }
      resultDiv.innerText = result || "Error. Try refreshing";
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
  });
}

init();
