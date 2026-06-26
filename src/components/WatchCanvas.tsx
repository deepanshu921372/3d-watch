"use client";

import { useEffect, useRef, useState } from "react";

interface WatchCanvasProps {
  scrollProgress: number;
  onPreloadProgress: (progress: number) => void;
}

const TOTAL_FRAMES = 240;

export default function WatchCanvas({ scrollProgress, onPreloadProgress }: WatchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animationFrameIdRef = useRef<number | null>(null);

  // Preload all 240 frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    onPreloadProgress(0);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/images/sequence/ezgif-frame-${paddedIndex}.jpg`;

      const finalize = () => {
        loadedCount++;
        const pct = (loadedCount / TOTAL_FRAMES) * 100;
        onPreloadProgress(pct);
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };

      img.onload = finalize;
      img.onerror = finalize;
      images.push(img);
    }
  }, [onPreloadProgress]);

  // Map scroll → target frame
  useEffect(() => {
    const targetFrame = Math.max(
      1,
      Math.min(TOTAL_FRAMES, Math.floor(scrollProgress * (TOTAL_FRAMES - 1)) + 1)
    );
    targetFrameRef.current = targetFrame;
  }, [scrollProgress]);

  // RAF render loop with lerping
  useEffect(() => {
    if (!imagesLoaded) return;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameIdRef.current = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      const lerpFactor = 0.13;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * lerpFactor;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameIndex = Math.round(currentFrameRef.current);
      const img = imagesRef.current[frameIndex - 1];

      if (img && img.complete) {
        ctx.fillStyle = "#08080B";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imageRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        let dx = 0;
        let dy = 0;

        if (canvasRatio > imageRatio) {
          drawWidth = canvasWidth;
          drawHeight = canvasWidth / imageRatio;
          dy = (canvasHeight - drawHeight) / 2;
        } else {
          drawHeight = canvasHeight;
          drawWidth = canvasHeight * imageRatio;
          dx = (canvasWidth - drawWidth) / 2;

          if (canvasWidth < 768) {
            const scaleMultiplier = 1.15;
            drawWidth *= scaleMultiplier;
            drawHeight *= scaleMultiplier;
            dx = (canvasWidth - drawWidth) / 2;
            dy = (canvasHeight - drawHeight) / 2;
          }
        }

        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [imagesLoaded]);

  // Resize + DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(1, 1);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#08080B]">
      {/* Ambient lighting — rose gold key from upper-left */}
      <div className="absolute top-[5%] left-[15%] w-[45vmin] h-[45vmin] bg-[#C9885E]/14 rounded-full blur-[120px] pointer-events-none z-0" />
      {/* Cool fill — deep movement blue from lower-right */}
      <div className="absolute bottom-[10%] right-[10%] w-[40vmin] h-[40vmin] bg-[#3D5A78]/16 rounded-full blur-[120px] pointer-events-none z-0" />
      {/* Center halo — soft gold, behind the watch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vmin] h-[55vmin] max-w-[760px] max-h-[760px] bg-gradient-to-tr from-[#C9885E]/12 via-[#E0B584]/4 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Frame canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block relative z-10"
        style={{ backfaceVisibility: "hidden" }}
        aria-label="Meridian timepiece — scroll-driven photoreal animation"
      />

      {/* Film grain veil */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner brackets — editorial framing */}
      <div className="pointer-events-none absolute inset-6 md:inset-10 z-20">
        <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[#E0B584]/25" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-[#E0B584]/25" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-[#E0B584]/25" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-[#E0B584]/25" />
      </div>
    </div>
  );
}
