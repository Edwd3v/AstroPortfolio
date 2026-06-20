const RESET_DELAY_MS = 2200;

function fallbackCopyText(value, doc) {
  if (typeof doc?.createElement !== "function" || typeof doc?.execCommand !== "function") {
    return false;
  }

  const textarea = doc.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  doc.body?.append(textarea);
  textarea.select();

  try {
    return doc.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export async function copyTextToClipboard(value, doc = document, nav = navigator) {
  if (nav?.clipboard?.writeText) {
    try {
      await nav.clipboard.writeText(value);
      return true;
    } catch {
      return fallbackCopyText(value, doc);
    }
  }

  return fallbackCopyText(value, doc);
}

export function initEmailCopy(doc = document, win = window) {
  const buttons = [...doc.querySelectorAll("[data-copy-email-button]")];

  if (!buttons.length) {
    return false;
  }

  const cleanups = [];

  for (const button of buttons) {
    const successLabel = button.dataset.copyEmailSuccess || "";
    const statusId = button.getAttribute("aria-describedby");
    const statusElement = statusId ? doc.getElementById(statusId) : null;
    const badge = button.querySelector("[data-copy-badge]");
    const feedback = button.querySelector("[data-copy-feedback]");
    let resetTimer = 0;
    let swapTimer = 0;

    const resetStatus = () => {
      if (badge) badge.textContent = "+";
      if (feedback) feedback.textContent = "";
      if (statusElement) statusElement.textContent = "";
      delete button.dataset.copied;
    };

    const handleClick = async () => {
      const value = button.dataset.copyEmailValue || "";

      if (!value) {
        return;
      }

      const copied = await copyTextToClipboard(value, doc, win.navigator);

      if (copied) {
        button.dataset.copied = "";
        if (badge) {
          win.clearTimeout(swapTimer);
          swapTimer = win.setTimeout(() => { badge.textContent = "✓"; }, 80);
        }
      } else {
        delete button.dataset.copied;
        if (badge) badge.textContent = "+";
      }

      if (feedback) feedback.textContent = copied ? successLabel : "";
      if (statusElement) statusElement.textContent = copied ? successLabel : "";

      if (resetTimer) {
        win.clearTimeout(resetTimer);
      }

      resetTimer = win.setTimeout(resetStatus, RESET_DELAY_MS);
    };

    button.addEventListener("click", handleClick);
    cleanups.push(() => {
      button.removeEventListener("click", handleClick);
      win.clearTimeout(resetTimer);
      win.clearTimeout(swapTimer);
      resetStatus();
    });
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
