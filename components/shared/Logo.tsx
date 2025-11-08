"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";

import { BRAND_LOGO_RADIUS, BRAND_LOGO_SOURCES, BRAND_NAME } from "@/config/site";

const LOGO_SRC = BRAND_LOGO_SOURCES[0] ?? "/brand/swiftsend-logo.png";

export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: LogoSize;
  priority?: boolean;
  prefetch?: boolean;
  ariaLabel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  imageSizes?: string;
}

const getDimension = (size: LogoSize | undefined) => {
  switch (size) {
    case "sm":
      return 28;
    case "lg":
      return 44;
    default:
      return 32;
  }
};

export function Logo({
  className,
  showWordmark = false,
  size = "md",
  priority = false,
  prefetch = false,
  ariaLabel = "Go to home",
  onClick,
  imageSizes,
}: LogoProps) {
  const dimension = getDimension(size);
  const classes: string[] = [];
  if (className) {
    classes.push(className);
  }
  const hasBrandClass = className?.split(/\s+/).includes("brand");
  if (!hasBrandClass) {
    classes.push("brand");
  }
  if (!showWordmark && !classes.includes("brand--solo")) {
    classes.push("brand--solo");
  }
  const combinedClassName = classes.join(" ");
  const textClassName = showWordmark ? "brand-text" : undefined;
  const resolvedSizes = imageSizes ?? "(max-width: 768px) 28px, 32px";

  return (
    <Link
      href="/"
      prefetch={prefetch}
      aria-label={ariaLabel}
      className={combinedClassName}
      onClick={onClick}
    >
      <span
        className="brand-mark"
        aria-hidden="true"
        style={{
          position: "relative",
          width: `${dimension}px`,
          height: `${dimension}px`,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: BRAND_LOGO_RADIUS,
        }}
      >
        <Image
          src={LOGO_SRC}
          alt={BRAND_NAME}
          width={dimension}
          height={dimension}
          priority={priority}
          sizes={resolvedSizes}
          style={{
            display: "block",
            height: "100%",
            width: "auto",
            borderRadius: BRAND_LOGO_RADIUS,
            objectFit: "contain",
          }}
        />
      </span>
      {showWordmark ? <span className={textClassName}>{BRAND_NAME}</span> : null}
    </Link>
  );
}

export default Logo;
