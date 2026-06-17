const ACTIVE_CLASS = "is-active";
const DISTORTING_CLASS = "is-distorting";

export function getMostVisibleSection(entries) {
  return [...entries]
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]?.target.id;
}

export function getMostVisibleSectionFromRatios(ratios) {
  return [...ratios.entries()]
    .filter(([, ratio]) => ratio > 0)
    .sort((first, second) => second[1] - first[1])[0]?.[0];
}

function triggerDistortion(link, win) {
  link.classList.remove(DISTORTING_CLASS);
  void link.offsetWidth;
  link.classList.add(DISTORTING_CLASS);
  win.setTimeout(() => {
    link.classList.remove(DISTORTING_CLASS);
  }, 420);
}

export function initSectionNavigation(doc = document, win = window) {
  const links = [...doc.querySelectorAll("[data-nav-section]")];
  const sectionIds = [...new Set(links.map((link) => link.dataset.navSection))];
  const sections = sectionIds
    .map((sectionId) => doc.getElementById(sectionId))
    .filter(Boolean);

  if (!links.length || !sections.length || typeof win.IntersectionObserver !== "function") {
    return false;
  }

  let activeSection = "";
  const visibilityRatios = new Map(sections.map((section) => [section.id, 0]));

  const setActiveSection = (sectionId) => {
    if (!sectionId || sectionId === activeSection) {
      return;
    }

    activeSection = sectionId;

    for (const link of links) {
      const isActive = link.dataset.navSection === sectionId;
      link.classList.toggle(ACTIVE_CLASS, isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
        triggerDistortion(link, win);
      } else {
        link.removeAttribute("aria-current");
        link.classList.remove(DISTORTING_CLASS);
      }
    }
  };

  for (const link of links) {
    link.addEventListener("pointerenter", () => triggerDistortion(link, win), { passive: true });
    link.addEventListener("focus", () => triggerDistortion(link, win));
  }

  const observer = new win.IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visibilityRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      }

      const sectionId = getMostVisibleSectionFromRatios(visibilityRatios);
      setActiveSection(sectionId);
    },
    {
      rootMargin: "-30% 0px -45% 0px",
      threshold: [0.12, 0.28, 0.44, 0.6],
    },
  );

  for (const section of sections) {
    observer.observe(section);
  }

  const initialHash = win.location.hash.replace("#", "");
  setActiveSection(sectionIds.includes(initialHash) ? initialHash : sections[0].id);

  return () => observer.disconnect();
}
