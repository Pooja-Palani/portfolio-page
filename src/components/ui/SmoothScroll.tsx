"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let _lenis: Lenis | null = null;

export function pauseLenis() { _lenis?.stop(); }
export function resumeLenis() { _lenis?.start(); }

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.10,
      smoothWheel: true,
      // No wheelMultiplier — default (1.0) avoids the section-jumping on MacBook trackpad
    });
    _lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // properly cancel so no ghost loop persists
      lenis.destroy();
      _lenis = null;
    };
  }, []);

  return <>{children}</>;
}
