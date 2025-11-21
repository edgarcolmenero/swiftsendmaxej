import type { AnchorHTMLAttributes, ReactNode } from "react";

interface GradientPillButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function GradientPillButton({
  children,
  className = "",
  ...props
}: GradientPillButtonProps) {
  const classes = ["blueprint-cta-button", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
