import type { FC } from "react";

/**
 * BackgroundStarfield renders a fixed, non-interactive starfield that can sit behind
 * any page section. It uses layered divs so each layer can animate at its own
 * cadence, creating a subtle, premium twinkle without relying on canvas or JS loops.
 */
const BackgroundStarfield: FC = () => {
  return (
    <div className="starfield" aria-hidden="true">
      <span className="starfield__layer starfield__layer--near" />
      <span className="starfield__layer starfield__layer--mid" />
      <span className="starfield__layer starfield__layer--far" />
    </div>
  );
};

export default BackgroundStarfield;
