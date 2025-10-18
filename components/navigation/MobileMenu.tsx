"use client";

import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./mobile-menu.css";

type MobileMenuChild = {
  href: string;
  label: string;
};

export type MobileMenuItem = {
  href: string;
  label: string;
  children?: MobileMenuChild[];
};

export interface MobileMenuProps {
  brandMark: ReactNode;
  id: string;
  items: MobileMenuItem[];
  onClose: () => void;
  onNavigate: () => void;
  open: boolean;
}

const TRANSITION_MS = 220;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const getFocusableElements = (node: HTMLElement | null) => {
  if (!node) {
    return [] as HTMLElement[];
  }

  return Array.from(
    node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
};

export default function MobileMenu({
  brandMark,
  id,
  items,
  onClose,
  onNavigate,
  open,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(open);
  const [isClosing, setIsClosing] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(media.matches);

    updateMotion();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateMotion);
    } else {
      media.addListener(updateMotion);
    }

    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", updateMotion);
      } else {
        media.removeListener(updateMotion);
      }
    };
  }, []);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      setIsClosing(false);
      return;
    }

    if (!isMounted) {
      return;
    }

    if (reduceMotion) {
      setIsClosing(false);
      setIsMounted(false);
      return;
    }

    setIsClosing(true);
    const timeout = window.setTimeout(() => {
      setIsClosing(false);
      setIsMounted(false);
    }, TRANSITION_MS);

    return () => window.clearTimeout(timeout);
  }, [open, isMounted, reduceMotion]);

  useEffect(() => {
    if (!open) {
      setActiveAccordion(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isMounted) {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const focusInitial = () => {
      const focusables = getFocusableElements(dialog);
      const first = focusables[0] ?? closeButtonRef.current;
      first?.focus({ preventScroll: true });
    };

    focusInitial();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusables = getFocusableElements(dialog);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !focusables.includes(active as HTMLElement)) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMounted, onClose, open]);

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleNavigate = () => {
    onNavigate();
  };

  const accordionItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        key: `${item.label}-${item.href}`,
      })),
    [items]
  );

  if (!isMounted) {
    return null;
  }

  const stateClass = open && !isClosing ? " mobile-menu--open" : "";
  const closingClass = isClosing ? " mobile-menu--closing" : "";

  return (
    <div
      ref={dialogRef}
      className={`mobile-menu${stateClass}${closingClass}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      id={id}
      onClick={handleBackdropClick}
    >
      <div className="mobile-menu__backdrop" aria-hidden="true" />
      <div className="mobile-menu__panel" role="document">
        <div className="mobile-menu__top">
          <span className="mobile-menu__brand" aria-hidden="true">
            {brandMark}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-menu__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-labelledby={`${id}-title`}>
          <h2 id={`${id}-title`} className="mobile-menu__title">
            Navigation
          </h2>
          <ul className="mobile-menu__list">
            {accordionItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isActive = activeAccordion === item.key;

              if (!hasChildren) {
                return (
                  <li key={item.key} className="mobile-menu__item">
                    <a
                      href={item.href}
                      className="mobile-menu__link"
                      onClick={handleNavigate}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }

              return (
                <li
                  key={item.key}
                  className="mobile-menu__item mobile-menu__item--accordion"
                  data-open={isActive ? "true" : "false"}
                >
                  <button
                    type="button"
                    className="mobile-menu__accordion-trigger"
                    aria-expanded={isActive}
                    onClick={() =>
                      setActiveAccordion((current) =>
                        current === item.key ? null : item.key
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="mobile-menu__chevron">
                      {isActive ? "–" : "+"}
                    </span>
                  </button>
                  <div
                    className="mobile-menu__accordion-panel"
                    hidden={!isActive}
                  >
                    <ul>
                      {item.children?.map((child) => (
                        <li key={`${item.key}-${child.href}`}>
                          <a
                            href={child.href}
                            className="mobile-menu__sublink"
                            onClick={handleNavigate}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
