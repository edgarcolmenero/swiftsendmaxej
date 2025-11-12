import type { HTMLAttributes } from "react";

import "./Portfolio.module.css";

type PortfolioSectionProps = HTMLAttributes<HTMLElement>;

export default function PortfolioSection({
  children,
  className,
  id: _ignored,
  ...rest
}: PortfolioSectionProps) {
  const baseClassName = "anchor-section scroll-mt-24";
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <section
      id="work"
      className={combinedClassName}
      data-testid="section-work"
      {...rest}
    >
      {children}
    </section>
  );
}
