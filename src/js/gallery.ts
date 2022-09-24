const FOCUSED_CLASSNAME = "focused";

function getGallery(): Element {
  return document.getElementById("gallery") as Element;
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

function getFocusedEntry(): HTMLLIElement | null {
  return document.querySelector(`#gallery li.${FOCUSED_CLASSNAME}`);
}

function clearFocus() {
  getFocusedEntry()?.classList?.remove(FOCUSED_CLASSNAME);
}

function focusEntry(element: Element | null | undefined) {
  clearFocus();
  element?.classList?.add(FOCUSED_CLASSNAME);
}

function isElementFocused(element: Element | null | undefined): boolean {
  return element?.classList?.contains(FOCUSED_CLASSNAME) ?? false;
}

export function initGallery() {
  const gallery = getGallery();
  const galleryList = getGalleryList();
  const allEntries = galleryList.querySelectorAll("li");

  allEntries.forEach((entry) => {
    entry.addEventListener("click", () => {
      if (isElementFocused(entry)) {
        clearFocus();
      } else {
        focusEntry(entry);
      }
    });
  });

  const elementWidth = allEntries[0].getBoundingClientRect().width;
  const [prevButton, nextButton] = getGalleryNavButtons();

  function buttonClickCommon() {
    // Requires a timeout to avoid conflicts with the event being handled.
    setTimeout(() => gallery.scrollIntoView(), 0);
  }

  prevButton.addEventListener("click", () => {
    buttonClickCommon();
    focusEntry(getFocusedEntry()?.previousElementSibling);

    galleryList.scrollBy({
      left: -(elementWidth ?? 100),
      behavior: "smooth",
    });
  });
  nextButton.addEventListener("click", () => {
    buttonClickCommon();
    focusEntry(getFocusedEntry()?.nextElementSibling);
    galleryList.scrollBy({
      left: elementWidth ?? 100,
      behavior: "smooth",
    });
  });
}
