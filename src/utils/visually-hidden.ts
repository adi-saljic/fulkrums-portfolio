import type { CSSProperties } from "react";

// Standard accessibility "visually hidden" style: the element stays in the DOM
// (so it is server-rendered and read by crawlers / screen readers) but is not
// shown visually. Used for SEO headings/intros on immersive full-screen sliders
// where a visible heading would overlap the design.
export const visuallyHidden: CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
};
