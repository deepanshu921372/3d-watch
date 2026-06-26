"use client";

interface StoryOverlayProps {
  scrollProgress: number;
  onNavigate: (progressPercent: number) => void;
}

// Smooth fade envelope for each storytelling beat
const getBeatOpacity = (progress: number, start: number, end: number) => {
  const fadeRange = 0.06;
  if (progress < start || progress > end) return 0;
  if (progress < start + fadeRange) return (progress - start) / fadeRange;
  if (progress > end - fadeRange) return (end - progress) / fadeRange;
  return 1;
};

// Subtle upward parallax inside the active beat
const getBeatYOffset = (progress: number, start: number, end: number) => {
  const range = end - start;
  const currentPos = (progress - start) / range;
  return (1 - currentPos) * 32 - 16;
};

// Scrubber: 5 chapter ticks
const chapters = [
  { label: "I", title: "Overture", progress: 0.05 },
  { label: "II", title: "Case", progress: 0.30 },
  { label: "III", title: "Movement", progress: 0.55 },
  { label: "IV", title: "Dial", progress: 0.80 },
  { label: "V", title: "Reserve", progress: 0.96 },
];

export default function StoryOverlay({ scrollProgress, onNavigate }: StoryOverlayProps) {
  const beats = [
    {
      id: "hero",
      start: 0.0,
      end: 0.15,
      align: "center",
      content: (
        <div className="flex flex-col items-center text-center px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C9885E]/60" />
            <span className="kicker text-gold-foil">The Meridian Reference</span>
            <span className="w-8 h-px bg-[#C9885E]/60" />
          </div>
          <h2 className="serif-display text-[clamp(3.5rem,10vw,9rem)] text-white uppercase">
            The Tourbillon
          </h2>
          <p className="serif-display italic text-[#E0B584]/90 text-2xl md:text-4xl mt-3 lowercase tracking-tight">
            n°&nbsp;1908
          </p>

          <div className="hairline w-40 mt-8 mb-6" />

          <p className="text-base md:text-lg font-light text-white/65 max-w-xl leading-relaxed">
            A skeletonized rose-gold tourbillon, hand-finished in Geneva.
            <br className="hidden md:inline" />
            Three hundred hours of human labour. One eternity of precision.
          </p>

          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="kicker text-white/35">Scroll to Disassemble</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#C9885E]/60 via-white/30 to-transparent" />
          </div>
        </div>
      ),
    },
    {
      id: "case",
      start: 0.18,
      end: 0.42,
      align: "left",
      content: (
        <div className="flex flex-col items-start text-left px-6 md:px-16 max-w-lg md:max-w-xl ml-0 md:ml-12 lg:ml-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="numeral text-[10px] text-[#C9885E] tracking-[0.3em]">CHAPTER&nbsp;I</span>
            <span className="w-10 h-px bg-[#C9885E]/40" />
            <span className="kicker text-white/45">The Case</span>
          </div>
          <h3 className="serif-display text-4xl md:text-6xl text-white mb-2">
            Sculpted from
          </h3>
          <h3 className="serif-display italic text-platinum-foil text-4xl md:text-6xl mb-7">
            a single billet.
          </h3>

          <p className="text-white/55 font-light text-[15px] leading-[1.75] max-w-md mb-5">
            The 40&nbsp;mm case is machined from a solid block of <span className="text-[#E0B584]">18&nbsp;k rose gold</span> over brushed grade-5 titanium. Polished bevels meet vertically brushed flanks — a play of light that changes with every angle of the wrist.
          </p>
          <p className="text-white/50 font-light text-[14px] leading-[1.75] max-w-md">
            Domed sapphire crystal, double anti-reflective. Screw-down crown. Water-resistance to <span className="numeral text-white/80">300&nbsp;m</span>.
          </p>

          <div className="hairline w-32 my-6" />

          <div className="grid grid-cols-3 gap-4 max-w-sm">
            <div>
              <div className="numeral text-xl text-white">40<span className="text-white/40 text-sm">mm</span></div>
              <div className="kicker text-white/35 mt-1">Diameter</div>
            </div>
            <div>
              <div className="numeral text-xl text-white">11.2<span className="text-white/40 text-sm">mm</span></div>
              <div className="kicker text-white/35 mt-1">Thickness</div>
            </div>
            <div>
              <div className="numeral text-xl text-white">300<span className="text-white/40 text-sm">m</span></div>
              <div className="kicker text-white/35 mt-1">Water</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate(0.55)}
            className="group flex items-center gap-3 mt-9 kicker text-[#E0B584] hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span className="w-6 h-px bg-current transition-all duration-500 group-hover:w-10" />
            Reveal the Movement
          </button>
        </div>
      ),
    },
    {
      id: "movement",
      start: 0.45,
      end: 0.68,
      align: "right",
      content: (
        <div className="flex flex-col items-start text-left md:items-end md:text-right px-6 md:px-16 max-w-lg md:max-w-xl mr-0 md:mr-12 lg:mr-20 self-start md:self-end">
          <div className="flex items-center gap-3 mb-5">
            <span className="kicker text-white/45">The Movement</span>
            <span className="w-10 h-px bg-[#C9885E]/40" />
            <span className="numeral text-[10px] text-[#C9885E] tracking-[0.3em]">CHAPTER&nbsp;II</span>
          </div>
          <h3 className="serif-display text-4xl md:text-6xl text-white mb-2">
            A heartbeat
          </h3>
          <h3 className="serif-display italic text-gold-foil text-4xl md:text-6xl mb-7">
            measured in jewels.
          </h3>

          <p className="text-white/55 font-light text-[15px] leading-[1.75] max-w-md mb-5">
            Caliber <span className="numeral text-[#E0B584]">M-1908</span> beats at <span className="numeral text-white">28,800 vph</span> through <span className="numeral text-white">38&nbsp;jewels</span>, delivering 72 hours of autonomous reserve.
          </p>
          <p className="text-white/50 font-light text-[14px] leading-[1.75] max-w-md">
            Côtes de Genève finishing. Hand-anglaged bridges. A 22&nbsp;k gold rotor, visible through the sapphire caseback — horology, made transparent.
          </p>

          <div className="hairline w-32 my-6 md:ml-auto" />

          <div className="flex flex-wrap gap-2 md:justify-end">
            <span className="pill"><span className="pill-dot" />COSC Certified</span>
            <span className="pill"><span className="pill-dot" />72&thinsp;h Reserve</span>
            <span className="pill"><span className="pill-dot" />Tourbillon</span>
          </div>
        </div>
      ),
    },
    {
      id: "dial",
      start: 0.71,
      end: 0.88,
      align: "left",
      content: (
        <div className="flex flex-col items-start text-left px-6 md:px-16 max-w-lg md:max-w-2xl ml-0 md:ml-12 lg:ml-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="numeral text-[10px] text-[#C9885E] tracking-[0.3em]">CHAPTER&nbsp;III</span>
            <span className="w-10 h-px bg-[#C9885E]/40" />
            <span className="kicker text-white/45">Dial & Details</span>
          </div>
          <h3 className="serif-display text-4xl md:text-6xl text-white mb-2">
            Precision,
          </h3>
          <h3 className="serif-display italic text-platinum-foil text-4xl md:text-6xl mb-7">
            made visible.
          </h3>

          <p className="text-white/55 font-light text-[15px] leading-[1.75] max-w-lg mb-6">
            We don&apos;t print indices — we apply them. Each marker is set by hand into a galvanic-finished dial, filled with Super-LumiNova, and matched to skeletonized dauphine hands that float above a sunburst guilloché surface.
          </p>

          <div className="hairline w-40 my-2" />

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-6 max-w-md">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="numeral text-3xl text-white">-2</span>
                <span className="text-white/40 text-sm">/</span>
                <span className="numeral text-3xl text-white">+2</span>
              </div>
              <div className="kicker text-white/35 mt-1">Sec/Day Accuracy</div>
            </div>
            <div>
              <div className="numeral text-3xl text-white">
                100<span className="text-white/40 text-sm">%</span>
              </div>
              <div className="kicker text-white/35 mt-1">Hand Finished</div>
            </div>
            <div>
              <div className="numeral text-3xl text-white">
                300<span className="text-white/40 text-base">+</span>
              </div>
              <div className="kicker text-white/35 mt-1">Hours of Labour</div>
            </div>
            <div>
              <div className="numeral text-3xl text-white">
                188
              </div>
              <div className="kicker text-white/35 mt-1">Components</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "cta",
      start: 0.91,
      end: 1.0,
      align: "center",
      content: (
        <div className="flex flex-col items-center text-center px-4 max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C9885E]/60" />
            <span className="kicker text-gold-foil">Acquisition by Invitation</span>
            <span className="w-8 h-px bg-[#C9885E]/60" />
          </div>
          <h2 className="serif-display text-[clamp(2.5rem,8vw,6.5rem)] text-white uppercase mb-2">
            Time,
          </h2>
          <h2 className="serif-display italic text-gold-foil text-[clamp(2.5rem,8vw,6.5rem)] mb-7">
            perfected.
          </h2>

          <p className="text-white/55 font-light text-base max-w-md mb-3">
            Hand-assembled in Geneva. COSC-certified. Delivered in a custom walnut case with a hand-numbered certificate of authenticity.
          </p>
          <p className="kicker text-[#C9885E]/80 mb-10">
            Limited edition · <span className="numeral">88</span> pieces worldwide
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
            <button
              onClick={() => alert("Reservation enquiry sent to the Atelier. Meridian will be in touch shortly.")}
              className="btn-primary w-full sm:w-auto"
            >
              Reserve Yours
              <span aria-hidden>→</span>
            </button>
            <button
              onClick={() => onNavigate(0.05)}
              className="btn-ghost w-full sm:w-auto"
            >
              Begin Again
            </button>
          </div>

          <div className="hairline w-32 mt-12" />
          <span className="kicker text-white/30 mt-4">Crafted in Genève · Worn forever</span>
        </div>
      ),
    },
  ];

  // Determine active chapter for the scrubber
  const activeChapterIdx = chapters.reduce((acc, ch, idx) => {
    return scrollProgress >= ch.progress - 0.04 ? idx : acc;
  }, 0);

  return (
    <>
      {/* Beat layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-25">
        {beats.map((beat) => {
          const opacity = getBeatOpacity(scrollProgress, beat.start, beat.end);
          const yOffset = getBeatYOffset(scrollProgress, beat.start, beat.end);
          if (opacity <= 0) return null;

          return (
            <div
              key={beat.id}
              className={`absolute inset-0 flex items-center w-full h-full pointer-events-none ${
                beat.align === "center"
                  ? "justify-center"
                  : beat.align === "right"
                  ? "justify-end"
                  : "justify-start"
              }`}
              style={{
                opacity,
                transform: `translate3d(0, ${yOffset}px, 0)`,
                transition: "opacity 0.15s linear, transform 0.15s linear",
                willChange: "opacity, transform",
              }}
            >
              <div className="pointer-events-auto w-full flex flex-col justify-center h-full">
                {beat.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* CHAPTER SCRUBBER — right vertical rail */}
      <div className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-5 pointer-events-auto">
        <span className="kicker text-white/30 mb-2 [writing-mode:vertical-rl] rotate-180">
          Movement
        </span>
        {chapters.map((ch, i) => {
          const isActive = i === activeChapterIdx;
          return (
            <button
              key={ch.label}
              onClick={() => onNavigate(ch.progress)}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label={`Jump to chapter ${ch.label} — ${ch.title}`}
            >
              <span
                className={`numeral text-[10px] tracking-widest transition-all duration-500 ${
                  isActive ? "text-[#E0B584] opacity-100" : "text-white/30 opacity-0 group-hover:opacity-100"
                }`}
              >
                {ch.title}
              </span>
              <span
                className={`flex items-center justify-center transition-all duration-500 ${
                  isActive ? "w-6" : "w-3 group-hover:w-5"
                } h-px ${
                  isActive ? "bg-[#C9885E]" : "bg-white/25 group-hover:bg-white/60"
                }`}
              />
              <span
                className={`numeral text-[10px] transition-colors duration-300 ${
                  isActive ? "text-[#E0B584]" : "text-white/40 group-hover:text-white/80"
                }`}
              >
                {ch.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* PROGRESS RAIL — bottom of viewport */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="numeral text-[10px] text-white/40">
            {String(Math.round(scrollProgress * 100)).padStart(2, "0")}
          </span>
          <div className="relative w-40 md:w-56 h-px bg-white/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B87333] via-[#C9885E] to-[#E0B584]"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="numeral text-[10px] text-white/40">100</span>
        </div>
        <span className="kicker text-white/30">Movement Progress</span>
      </div>
    </>
  );
}
