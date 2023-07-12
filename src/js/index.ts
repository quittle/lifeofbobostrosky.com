import { createFocusTrap } from "focus-trap";
import { initGallery } from "./gallery";
import { initMemorialWall } from "./memorial-wall";

function initScroll() {
  function onLoad() {
    const main = document.querySelector("main");
    if (main?.scrollTop !== 0) {
      return;
    }

    const fragment = location.hash;
    if (!fragment) {
      return;
    }

    const fragmentId = fragment.substring(1);
    if (!fragmentId) {
      return;
    }

    const element = document.getElementById(fragmentId);
    if (!element) {
      return;
    }
    element.scrollIntoView();
  }
  window.addEventListener("load", onLoad);
}

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
    },
  ).observe(menuButton);

  const navItems = document.querySelectorAll<HTMLAnchorElement>("nav a");
  for (const item of navItems) {
    item.addEventListener("click", () => {
      setMenuButtonChecked(false);
    });
  }
}

function initLinks() {
  document
    .querySelectorAll<HTMLAnchorElement>("a[data-encoded-href]")
    .forEach((element) => {
      element.href = atob(element.dataset["encodedHref"] ?? "");
    });
}

function init() {
  initScroll();
  initNav();
  initMemorialWall();
  initGallery();
  initLinks();
}

init();
