"use client";
import { useEffect } from "react";
import { consumeServicesIntent, runServicesIntent } from "@/utils/scroll-to-services";

// Module-level guard so dev Strict Mode's double-invoked effect (mount → unmount
// → mount) doesn't lose the intent: the first mount consumes it and starts the
// runner; the second mount sees `running` and bails. Reset when the runner is
// done, so a later fresh intent is honoured again.
let running = false;

// On the home page: if a "scroll to services" intent was recorded before a
// cross-page navigation, run the robust scroll once the smoother + #services
// are live. The runner is intentionally NOT cancelled on unmount.
export default function useServicesScrollIntent(): void {
  useEffect(() => {
    if (running) return;
    if (!consumeServicesIntent()) return;
    running = true;
    runServicesIntent(() => {
      running = false;
    });
  }, []);
}
