import { createFocusTrap } from "focus-trap";

function getMenuButton(): HTMLInputElement {
  return document.getElementById("menu-button") as HTMLInputElement;
}

function initNav() {
  const focusTrap = createFocusTrap("nav", {
    escapeDeactivates: false,
    returnFocusOnDeactivate: false,
  });

  const menuButton = getMenuButton();
  function setMenuButtonChecked(checked: boolean) {
    menuButton.checked = checked;
    menuButton.dispatchEvent(new Event("change"));
  }

  function updateMenuButton() {
    if (menuButton.checked) {
      focusTrap.activate();
      menuButton.title = "Close Navigation Menu";
    } else {
      focusTrap.deactivate();
      menuButton.title = "Open Navigation Menu";
    }
  }
  updateMenuButton();
  menuButton.addEventListener("change", updateMenuButton);
  menuButton.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      setMenuButtonChecked(!menuButton.checked);
    }
  });

  /*
   * Uncheck the menu button (which also deactivates the focus trap) if the menu disappears. This
   * will happen if the user resizes the window or rotates a mobile device screen.
   */
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 0) {
          setMenuButtonChecked(false);
        }
      });
    },
    {
      root: document.documentElement,
    }
  ).observe(menuButton);

  const navItems = document.querySelectorAll<HTMLAnchorElement>("nav a");
  for (const item of navItems) {
    item.addEventListener("click", () => {
      setMenuButtonChecked(false);
    });
  }
}

function getGalleryList(): HTMLOListElement {
  return document.querySelector("#gallery ul") as HTMLOListElement;
}

function getGalleryNavButtons(): [HTMLButtonElement, HTMLButtonElement] {
  return [
    document.getElementById("gallery-prev") as HTMLButtonElement,
    document.getElementById("gallery-next") as HTMLButtonElement,
  ];
}

function initGallery() {
  const galleryList = getGalleryList();
  const firstElement = galleryList.querySelector("li");
  const elementWidth = firstElement?.getBoundingClientRect().width;
  const [prevButton, nextButton] = getGalleryNavButtons();
  prevButton.addEventListener("click", () => {
    galleryList.scrollBy({
      left: -(elementWidth ?? 100),
      behavior: "smooth",
    });
  });
  nextButton.addEventListener("click", () => {
    galleryList.scrollBy({
      left: elementWidth ?? 100,
      behavior: "smooth",
    });
  });
}

function getContactForm(): HTMLFormElement {
  return document.getElementById("contact-form") as HTMLFormElement;
}

function initContactForm() {
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

function init() {
  initNav();
  initContactForm();
  initGallery();
}

init();
