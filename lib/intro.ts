"use client";

import { useEffect, useState } from "react";

/**
 * The preloader adds `intro-active` to <html> while it plays and fires
 * `photizo:intro-done` when it leaves. Animations that should start after it use this hook.
 */
export const INTRO_EVENT = "photizo:intro-done";

export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!document.documentElement.classList.contains("intro-active")) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener(INTRO_EVENT, on, { once: true });
    return () => window.removeEventListener(INTRO_EVENT, on);
  }, []);
  return done;
}
