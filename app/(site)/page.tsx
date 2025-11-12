"use client";

import { useMemo } from "react";

import { useHashScroll } from "./hooks/useHashScroll";
import { Process } from "./sections/Process";

const SECTION_IDS = ["about", "work", "labs", "packs"] as const;

function AnchorMarker({ id }: { id: string }) {
  return <section id={id} className="anchor-section anchor-marker" aria-hidden="true" />;
}

export default function Page() {
  useHashScroll();

  const anchors = useMemo(
    () => SECTION_IDS.map((sectionId) => <AnchorMarker key={sectionId} id={sectionId} />),
    []
  );

  return (
    <main id="home" className="anchor-section" data-scroll-root>
      {anchors[0]}
      <Process />
      {anchors.slice(1)}
    </main>
  );
}
