import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, RotateCcw, X, Radio, History, Loader2, TrendingUp } from "lucide-react";
import { IMAGE_URLS } from "@/lib/imageUrls";
import { WinnersList } from "./WinnersList";
import { fetchCrashPoint, VIP_ID } from "@/lib/predictions";

const W = 320;
const H = 220;

const P0 = { x: 16, y: H - 16 };
const P1 = { x: W * 0.66, y: H - 22 };
const P2 = { x: W - 28, y: 26 };

function pointAt(t: number) {
  const u = 1 - t;
  return {
    x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
  };
}

function pathTo(t: number) {
  let d = `M ${P0.x} ${P0.y}`;
  const steps = 56;
  for (let i = 1; i <= steps; i++) {
    const p = pointAt((t * i) / steps);
    d += ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }
  return d;
}

type Status = "idle" | "loading" | "flying" | "crashed";

const SPARKS = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  const r = 40 + (i % 3) * 18;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
});

const SPOKES = Array.from({ length: 34 }, (_, i) => {
  const a = (-Math.PI / 2) * (i / 33) - 0.03;
  return { x: P0.x + Math.cos(a) * 480, y: P0.y + Math.sin(a) * 480 };
});

const STARS = Array.from({ length: 26 }, (_, i) => ({
  x: ((i * 71) % 100) + 0.5,
  y: ((i * 37) % 78) + 4,
  d: 1.6 + ((i * 13) % 20) / 10,
}));

export function AviatorGame({ platform, userId }: { platform: string; userId?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [odd, setOdd] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const raf = useRef<number | null>(null);
  const isVip = userId === VIP_ID;

  const reset = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setStatus("idle");
    setOdd(1);
    setProgress(0);
    setShowDialog(false);
  }, []);

  useEffect(() => () => void (raf.current && cancelAnimationFrame(raf.current)), []);

  const fly = (crash: number) => {
    setStatus("flying");
    setOdd(1);
    setProgress(0);
    const DURATION = 1000; // العد يخلص في ثانية واحدة
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      if (t >= 1) {
        setOdd(crash);
        setProgress(1);
        setStatus("crashed");
        setHistory((h) => [crash, ...h].slice(0, 10));
        setTimeout(() => setShowDialog(true), 550);
        return;
      }
      setOdd(Math.exp(Math.log(crash) * t));
      setProgress(t);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const start = async () => {
    if (isVip) {
      setStatus("loading");
      const remote = await fetchCrashPoint();
      fly(remote ?? 1 + Math.random() * 2);
      return;
    }
    fly(1 + Math.random() * 2);
  };

  const plane = pointAt(progress);
  const angle = (() => {
    const a = pointAt(Math.max(0, progress - 0.02));
    return (Math.atan2(plane.y - a.y, plane.x - a.x) * 180) / Math.PI;
  })();

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center overflow-hidden bg-[image:var(--gradient-page)] px-5 py-9">
      <header className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.35em] text-primary">
            <Radio className="h-3 w-3 animate-pulse" /> Live predictor
          </p>
          <h1 className="mt-1 truncate font-display text-[1.9rem] font-extrabold tracking-tight text-foreground">
            Aviator
          </h1>
        </div>
        <span className="shrink-0 rounded-full border border-primary/20 bg-card px-3.5 py-1.5 text-xs font-bold text-primary shadow-[var(--shadow-card)]">
          {platform}
        </span>
      </header>

      {/* Round history */}
      <div className="relative mt-4 flex items-center gap-2 rounded-full border border-primary/12 bg-card px-3 py-2 shadow-[var(--shadow-card)]">
        <History className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
          {history.length === 0 ? (
            <span className="text-[0.66rem] text-muted-foreground">لا توجد جولات سابقة</span>
          ) : (
            history.map((h, i) => (
              <motion.span
                key={`${h}-${i}`}
                initial={{ opacity: 0, scale: 0.7, x: -8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-display text-[0.68rem] font-bold tabular-nums ${
                  h >= 2 ? "bg-success/12 text-success" : "bg-curve/12 text-curve"
                }`}
              >
                {h.toFixed(2)}x
              </motion.span>
            ))
          )}
        </div>
      </div>

      {/* Arena */}
      <div className="relative mt-3 overflow-hidden rounded-[1.75rem] border border-primary/15 bg-arena shadow-[var(--shadow-lift)]">
        {/* stars */}
        <div className="pointer-events-none absolute inset-0">
          {STARS.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-arena-foreground/50"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2 }}
              animate={{ opacity: [0.15, 0.8, 0.15] }}
              transition={{ duration: s.d, repeat: Infinity, delay: i * 0.11 }}
            />
          ))}
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <motion.g
            animate={status === "flying" ? { rotate: 360 } : {}}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${P0.x}px ${P0.y}px` }}
          >
            {SPOKES.map((s, i) => (
              <line
                key={i}
                x1={P0.x}
                y1={P0.y}
                x2={s.x}
                y2={s.y}
                stroke="currentColor"
                className="text-arena-foreground"
                opacity="0.055"
                strokeWidth="0.7"
              />
            ))}
          </motion.g>
        </svg>

        {/* multiplier */}
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <div className="text-center">
            <motion.span
              animate={
                status === "crashed"
                  ? { scale: [1, 1.16, 1] }
                  : status === "flying"
                    ? { scale: [1, 1.035, 1] }
                    : {}
              }
              transition={
                status === "flying" ? { duration: 1.4, repeat: Infinity } : { duration: 0.4 }
              }
              className={`block font-display text-[3.8rem] font-extrabold leading-none tabular-nums drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)] ${
                status === "crashed" ? "text-curve" : "text-arena-foreground"
              }`}
            >
              {odd.toFixed(2)}x
            </motion.span>
            {status === "crashed" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-display text-[0.72rem] uppercase tracking-[0.34em] text-curve"
              >
                Flew away!
              </motion.p>
            )}
            {status === "loading" && (
              <p className="mt-2 flex items-center justify-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-arena-foreground/60">
                <Loader2 className="h-3 w-3 animate-spin" /> جاري جلب التوقع
              </p>
            )}
            {status === "idle" && (
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.32em] text-arena-foreground/45">
                اضغط Start للتوقع
              </p>
            )}
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="relative block h-auto w-full">
          <defs>
            <linearGradient id="tail" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--curve)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--curve)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--curve)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--curve)" stopOpacity="0.02" />
            </linearGradient>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <line
            x1={P0.x}
            y1="10"
            x2={P0.x}
            y2={P0.y}
            stroke="currentColor"
            className="text-arena-foreground"
            opacity="0.22"
            strokeWidth="1"
          />
          <line
            x1={P0.x}
            y1={P0.y}
            x2={W - 8}
            y2={P0.y}
            stroke="currentColor"
            className="text-arena-foreground"
            opacity="0.22"
            strokeWidth="1"
          />

          {progress > 0 && (
            <>
              <path
                d={`${pathTo(progress)} L ${plane.x} ${P0.y} L ${P0.x} ${P0.y} Z`}
                fill="url(#fill)"
              />
              <path
                d={pathTo(progress)}
                fill="none"
                stroke="url(#tail)"
                strokeWidth="3.6"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            </>
          )}

          {status !== "crashed" && (
            <motion.g
              animate={status === "flying" ? { y: [0, -3, 0] } : { y: 0 }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >
              <g transform={`translate(${plane.x} ${plane.y}) rotate(${angle})`}>
                <circle r="16" className="text-curve" fill="currentColor" opacity="0.18" />
                <image href={IMAGE_URLS.plane} x="-20" y="-16" width="40" height="32" />
              </g>
            </motion.g>
          )}

          {status === "crashed" &&
            SPARKS.map((s, i) => (
              <motion.circle
                key={i}
                cx={plane.x}
                cy={plane.y}
                r="2.6"
                className="text-curve"
                fill="currentColor"
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={{ opacity: 0, x: s.x, y: s.y }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              />
            ))}
        </svg>

        {status === "crashed" && (
          <motion.div
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="pointer-events-none absolute h-14 w-14 rounded-full bg-curve blur-xl"
            style={{
              left: `${(plane.x / W) * 100}%`,
              bottom: `${((H - plane.y) / H) * 100}%`,
              translate: "-50% 50%",
            }}
          />
        )}
      </div>

      {/* Stats strip */}
      <div dir="rtl" className="relative mt-3 grid grid-cols-3 gap-2">
        {[
          { l: "الحالة", v: status === "flying" ? "طيران" : status === "crashed" ? "انفجار" : "جاهز" },
          { l: "آخر أود", v: history[0] ? `${history[0].toFixed(2)}x` : "—" },
          { l: "الجولات", v: String(history.length) },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-primary/12 bg-card px-3 py-2 text-center shadow-[var(--shadow-card)]"
          >
            <p className="text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">{s.l}</p>
            <p className="mt-0.5 font-display text-sm font-extrabold tabular-nums text-foreground">
              {s.v}
            </p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="relative mt-4 grid grid-cols-[1.4fr_1fr] gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2 }}
          onClick={start}
          disabled={status !== "idle"}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[image:var(--gradient-accent)] px-4 py-4 font-display text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:brightness-110 disabled:bg-none disabled:bg-secondary disabled:text-muted-foreground disabled:shadow-none"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}{" "}
          Start
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2 }}
          onClick={reset}
          disabled={status === "idle"}
          className="glass-card flex items-center justify-center gap-2 rounded-2xl px-4 py-4 font-display text-base font-bold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-60"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </motion.button>
      </div>

      <div className="relative mt-6 flex items-center justify-center gap-2 text-[0.62rem] text-muted-foreground">
        <TrendingUp className="h-3 w-3 text-success" /> إشارة محدثة لحظياً
      </div>

      <div className="relative mt-5">
        <WinnersList compact />
      </div>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background/75 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 22 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              dir="rtl"
              className="w-full max-w-xs overflow-hidden rounded-3xl border border-primary/15 bg-card text-center shadow-[var(--shadow-lift)]"
            >
              <div className="bg-[image:var(--gradient-accent)] px-6 py-3">
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-primary-foreground/85">
                  Cash out
                </p>
              </div>
              <div className="p-7">
                <p className="font-display text-lg font-bold text-foreground">اسحب عند</p>
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 font-display text-[3.3rem] font-extrabold leading-none tabular-nums text-success"
                >
                  {odd.toFixed(2)}x
                </motion.p>
                <div className="hairline mx-auto mt-6 h-px w-24" />
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-accent)] px-4 py-3.5 font-display font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
                >
                  <X className="h-4 w-4" /> Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
