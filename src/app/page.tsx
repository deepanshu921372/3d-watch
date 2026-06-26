"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import WatchCanvas from "@/components/WatchCanvas";
import StoryOverlay from "@/components/StoryOverlay";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable <= 0) return;

      const rawProgress = window.scrollY / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (preloadProgress >= 100) {
      const timer = setTimeout(() => setIsLoading(false), 900);
      return () => clearTimeout(timer);
    }
  }, [preloadProgress]);

  const handleNavigate = (progressPercent: number) => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const totalScrollable = scrollHeight - clientHeight;
    const targetScrollY = progressPercent * totalScrollable;

    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <main className="relative bg-[#08080B] min-h-screen select-none">
      <AnimatePresence>
        {isLoading && <Preloader progress={preloadProgress} />}
      </AnimatePresence>

      {!isLoading && <Navbar onNavigate={handleNavigate} />}

      {/* Pinned scrollytelling stage */}
      <div className="relative h-[500vh] w-full bg-radial-luxury">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <WatchCanvas
            scrollProgress={scrollProgress}
            onPreloadProgress={setPreloadProgress}
          />

          <StoryOverlay
            scrollProgress={scrollProgress}
            onNavigate={handleNavigate}
          />

          {/* Vignette layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080B] via-transparent to-[#08080B]/80 opacity-90 pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080B]/40 via-transparent to-[#08080B]/40 pointer-events-none z-20" />
        </div>
      </div>
    </main>
  );
}
