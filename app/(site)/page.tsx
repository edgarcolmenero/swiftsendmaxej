"use client";

import { useHashScroll } from "./hooks/useHashScroll";
import { Process } from "./sections/Process";

export default function Page() {
  useHashScroll();

  return (
    <main>
      <Process />
    </main>
  );
}
