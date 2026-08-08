import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ALL_IMAGE_URLS, IMAGE_URLS, preloadImage } from "@/lib/imageUrls";

export function Splash({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let imagesReady = false;
    let timeReady = false;
    let finished = false;
    let frame = 0;
    const finish = () => {
      if (!finished && imagesReady && timeReady) {
        finished = true;
        onDone();
      }
    };
    void Promise.all(ALL_IMAGE_URLS.map(preloadImage)).then(() => {
      imagesReady = true;
      finish();
    });
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 5000);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
      else {
        timeReady = true;
        finish();
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center gap-9 overflow-hidden bg-background px-8">
      <img
        src={IMAGE_URLS.heroBg}
        alt=""
        aria-hidden
        width={1024}
        height={1280}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 h-72 w-72 animate-drift rounded-full bg-primary/25 blur-3xl"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 animate-drift rounded-full bg-accent/20 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <span className="ring-pulse absolute inset-0 rounded-[2rem] border border-primary/40" />
        <div className="glow-ring relative overflow-hidden rounded-[2rem] bg-card p-1 animate-float">
          <img
            src={IMAGE_URLS.brandLogo}
            alt="Win Script logo"
            className="block h-auto w-56 max-w-[62vw] rounded-[1.75rem] object-contain"
          />
        </div>
      </motion.div>

      <div className="relative flex flex-col items-center gap-2">
        <motion.h1
          initial={{ opacity: 0, y: 14, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="shimmer-text font-display text-[2.1rem] font-extrabold"
        >
          WIN SCRIPT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground"
        >
          Aviator Predictor
        </motion.p>
      </div>

      <div className="relative mt-1 w-full max-w-[17rem]">
        <div className="h-[5px] w-full overflow-hidden rounded-full bg-primary/12">
          <motion.div
            className="h-full rounded-full bg-[image:var(--gradient-accent)] shadow-[var(--shadow-glow)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[0.65rem] tracking-[0.25em] text-muted-foreground">
          <span>LOADING</span>
          <span className="tabular-nums">
            {String(Math.round(progress * 100)).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
