import type { HTMLAttributes } from "react";

type PortfolioSectionProps = HTMLAttributes<HTMLElement>;

export default function PortfolioSection({
  children,
  className,
  id: _ignored,
  ...rest
}: PortfolioSectionProps) {
  return (
    <section id="work" className={className} {...rest}>
      {children}
    </section>
  );
}
