"use client";

import { motion } from "framer-motion";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  const pct = Math.round(progress);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#08080B] select-none overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60vmin] h-[60vmin] rounded-full bg-[#C9885E]/12 blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/4 w-[40vmin] h-[40vmin] rounded-full bg-[#3D5A78]/15 blur-[140px]" />
      </div>

      {/* Subtle film grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
           }}
      />

      {/* Hairline top frame */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* TOP RAIL */}
      <div className="relative z-10 w-full px-8 md:px-16 pt-8 md:pt-12 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="kicker text-white/40">Maison</span>
          <span className="kicker text-[#E0B584]">Meridian · Genève</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="kicker text-white/40">Reference</span>
          <span className="numeral text-[11px] text-white/70">M-1908.RG</span>
        </div>
      </div>

      {/* CENTER STAGE */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Decorative rotating ring */}
        <div className="relative flex items-center justify-center mb-12">
          <div className="absolute w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full border border-[#C9885E]/15 animate-spin-slow" />
          <div className="absolute w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full border border-white/5" />
          <div className="absolute w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-gradient-to-br from-[#C9885E]/8 to-transparent blur-2xl" />

          {/* Brand mark center */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <span className="kicker text-[#C9885E]/80 mb-3">Tourbillon · Skeleton</span>
            <h1 className="serif-display text-5xl md:text-7xl text-white tracking-[0.04em] uppercase">
              Meridian
            </h1>
            <div className="hairline w-24 mt-4 animate-hairline-draw" />
            <p className="kicker text-platinum-foil mt-4">The Art of Time</p>
          </motion.div>
        </div>

        {/* Progress block */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-baseline gap-3">
            <span className="kicker text-white/30">Calibrating</span>
            <div className="numeral text-5xl md:text-6xl font-extralight text-white leading-none">
              {String(pct).padStart(3, "0")}
              <span className="text-white/40 text-2xl md:text-3xl ml-1">%</span>
            </div>
          </div>

          {/* Progress bar — hairline with traveling pip */}
          <div className="relative w-64 md:w-80 h-px bg-white/8">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B87333] via-[#C9885E] to-[#E0B584]"
              style={{ width: `${pct}%` }}
              transition={{ type: "tween", duration: 0.3 }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#E0B584]"
              style={{
                left: `${pct}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 12px rgba(224, 181, 132, 0.80)",
                transition: "left 0.3s ease-out",
              }}
            />
          </div>

          {/* Ticker line */}
          <div className="flex items-center gap-3 mt-2">
            <span className="w-1 h-1 rounded-full bg-[#E0B584] animate-soft-pulse" />
            <span className="kicker text-white/40">Loading 240 Frames · Sequencing Movement</span>
          </div>
        </div>
      </div>

      {/* BOTTOM RAIL */}
      <div className="relative z-10 w-full px-8 md:px-16 pb-8 md:pb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-3 text-center md:text-left">
        <div className="flex items-center gap-6">
          <span className="kicker text-white/35">Caliber M-1908</span>
          <span className="hidden md:inline-block w-8 h-px bg-white/15" />
          <span className="kicker text-white/35">28,800 vph · 38 jewels</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="kicker text-white/35">Photoreal Scrollytelling</span>
          <span className="hidden md:inline-block w-8 h-px bg-white/15" />
          <span className="kicker text-[#E0B584]/70">Scroll to Disassemble</span>
        </div>
      </div>
    </motion.div>
  );
}
