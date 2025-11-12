"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function HashScroller() {
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) {
      return;
    }

    const id = hash.slice(1);
    if (!id) {
      return;
    }

    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname, params]);

  return null;
}
