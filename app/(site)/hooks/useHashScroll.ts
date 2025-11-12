"use client";

import { useEffect } from "react";

const HASH_PREFIX = "#";

const getHashId = () => {
  const { hash } = window.location;
  if (!hash || hash === HASH_PREFIX) {
    return "";
  }
  return decodeURIComponent(hash.replace(HASH_PREFIX, ""));
};

const getScrollBehavior = () => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "auto" as const;
  }
  return "smooth" as const;
};

export function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = getHashId();
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (!element) {
        return;
      }

      element.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
    };

    // Allow DOM to paint before attempting to scroll on initial load.
    requestAnimationFrame(scrollToHash);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
}
