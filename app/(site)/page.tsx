"use client";

import { useHashScroll } from "./hooks/useHashScroll";
import HomeSection from "./sections/Home";
import AboutSection from "./sections/About";
import ServicesSection from "./sections/Services";
import WorkSection from "./sections/Work";
import LabsSection from "./sections/Labs";
import PacksSection from "./sections/Packs";

export default function Page() {
  useHashScroll();

  return (
    <>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <LabsSection />
      <PacksSection />
    </>
  );
}
