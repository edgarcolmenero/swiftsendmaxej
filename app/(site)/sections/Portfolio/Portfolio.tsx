import type { HTMLAttributes } from "react";

import "./Portfolio.module.css";

type PortfolioSectionProps = HTMLAttributes<HTMLElement>;

export default function PortfolioSection({
  children,
  className,
  id: _ignored,
  ...rest
}: PortfolioSectionProps) {
  const combinedClassName = className
    ? `scroll-mt-24 ${className}`
    : "scroll-mt-24";

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
