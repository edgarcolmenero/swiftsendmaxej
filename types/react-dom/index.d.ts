// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
import type * as React from "react";

declare namespace ReactDOM {
  interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
  }

  function render(
    element: React.ReactNode,
    container: Element | DocumentFragment | null,
    callback?: (() => void) | undefined
  ): void;

  function hydrate(
    element: React.ReactNode,
    container: Element | DocumentFragment | null,
    callback?: (() => void) | undefined
  ): void;

  function createPortal(children: React.ReactNode, container: Element | DocumentFragment): React.ReactPortal;

  const version: string;
}

export = ReactDOM;
export as namespace ReactDOM;
