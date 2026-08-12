import { useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  UserPlus,
  Send,
  Wallet,
  ArrowLeft,
  ShieldCheck,
  IdCard,
  BadgeCheck,
  Ticket,
  Copy,
  Check,
} from "lucide-react";
import type { Platform } from "./PlatformSelect";
import { IMAGE_URLS } from "@/lib/imageUrls";

const logos: Record<Platform, string> = {
  Winwin: IMAGE_URLS.winwinLogo,
  Greenbet: IMAGE_URLS.greenbetLogo,
};

const PLATFORM_LINKS: Record<Platform, string> = {
  Winwin: "https://refpa79184.com/L?tag=d_5942292m_132250c_&site=5942292&ad=132250",
  Greenbet: "https://refpa79184.com/L?tag=d_5942292m_132250c_&site=5942292&ad=132250",
};

const PROMO_CODE = "SH222";

const TELEGRAM_LINK = "https://t.me/+dOilU-Mdd3E4OTk8";

export function Terms({
  platform,
  onComplete,
}: {
  platform: Platform;
  onComplete: (id: string) => void;
}) {
  const [id, setId] = useState("");
  const [copied, setCopied] = useState(false);

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
    } catch {
      /* ignore */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const ready = id.trim().length > 0;

  const items = [
    {
      icon: Download,
      title: "تنزيل المنصة",
      desc: "حمّل التطبيق الرسمي على هاتفك",
      tag: "1 دقيقة",
       img: IMAGE_URLS.stepDownload,
      href: PLATFORM_LINKS[platform],
    },
    {
      icon: UserPlus,
      title: `التسجيل في ${platform}`,
      desc: "أنشئ حساب جديد وفعّل بياناتك",
      tag: "2 دقيقة",
       img: IMAGE_URLS.stepRegister,
      href: PLATFORM_LINKS[platform],
    },
    {
      icon: Send,
      title: "الاشتراك في التلجرام",
      desc: "تابع القناة لاستقبال الإشارات",
      tag: "فوري",
       img: IMAGE_URLS.stepTelegram,
      href: TELEGRAM_LINK,
    },
    {
      icon: Ticket,
      title: "التسجيل بالبروموكود",
      desc: `استخدم كود ${PROMO_CODE} عند إنشاء الحساب`,
      tag: "مطلوب",
      img: IMAGE_URLS.stepRegister,
      href: undefined as string | undefined,
      promo: PROMO_CODE,
    },
    {
      icon: Wallet,
      title: "ايداع 300 جنيه أو 5$ ",
      desc: "الحد الأدنى لتشغيل السكريبت",
      tag: "مطلوب",
       img: IMAGE_URLS.stepDeposit,
      href: undefined as string | undefined,
    },
  ];

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[image:var(--gradient-page)] pb-10"
    >
      {/* Hero image header */}
      <div className="relative overflow-hidden rounded-b-[2.5rem]">
        <img
          src={IMAGE_URLS.termsHero}
          alt="تفعيل السكريبت على المنصة"
          width={1024}
          height={768}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_6%,transparent_70%)]" />

        <motion.img
          src={IMAGE_URLS.plane}
          alt=""
          aria-hidden
          initial={{ opacity: 0, x: 30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="animate-float pointer-events-none absolute left-3 top-4 h-20 w-20 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
        />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end justify-between gap-3"
          >
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card/85 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-primary backdrop-blur">
                Step 02
              </span>
              <h1 className="mt-2 font-display text-[1.85rem] font-extrabold leading-tight text-foreground">
                شروط التفعيل
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                على منصة <span className="font-bold text-primary">{platform}</span>
              </p>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-[var(--shadow-lift)]">
              <img src={logos[platform]} alt={platform} className="h-full w-full object-contain" />
            </span>
          </motion.div>
        </div>
      </div>

      <div className="px-5">
        {/* Progress strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 flex items-center gap-2"
        >
          {items.map((it, i) => (
            <span
              key={it.title}
              className="h-1 flex-1 overflow-hidden rounded-full bg-primary/12"
              aria-hidden
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.2 + i * 0.18, duration: 0.6 }}
                className="block h-full rounded-full bg-[image:var(--gradient-accent)]"
              />
            </span>
          ))}
        </motion.div>

        {/* Steps */}
        <ol className="mt-5 flex flex-col gap-3">
          {items.map((it, i) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="group relative overflow-hidden rounded-3xl border border-primary/12 bg-card shadow-[var(--shadow-card)]"
            >
              <span className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-[image:var(--gradient-accent)] opacity-70" />
              {(() => {
              const Wrapper: any = it.href ? "a" : "div";
              const wrapperProps = it.href
                ? { href: it.href, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
              <Wrapper {...wrapperProps} className="flex items-center gap-3 p-3.5">
                <span className="relative shrink-0 overflow-hidden rounded-2xl border border-primary/12 bg-secondary/50">
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-16 w-16 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1 left-1 grid h-5 w-5 place-items-center rounded-full bg-[image:var(--gradient-accent)] font-display text-[0.6rem] font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
                    {i + 1}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5 text-sm font-bold text-foreground">
                      <it.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="truncate">{it.title}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[0.58rem] text-muted-foreground">
                      {it.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.desc}</p>
                  {it.href && (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[0.62rem] font-bold text-primary">
                      اضغط للفتح
                      <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                    </span>
                  )}
                </div>
              </Wrapper>
              );
              })()}
              {"promo" in it && it.promo && (
                <div className="flex items-center gap-2 border-t border-primary/10 px-3.5 py-2.5">
                  <span className="flex-1 rounded-xl bg-secondary px-3 py-2 text-center font-display text-sm font-extrabold tracking-[0.2em] text-primary">
                    {it.promo}
                  </span>
                  <button
                    type="button"
                    onClick={copyPromo}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[image:var(--gradient-accent)] px-3 py-2 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "تم النسخ" : "نسخ"}
                  </button>
                </div>
              )}
            </motion.li>

          ))}
        </ol>

        {/* Visual reassurance card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative mt-5 overflow-hidden rounded-3xl border border-primary/12 shadow-[var(--shadow-card)]"
        >
          <img
            src={IMAGE_URLS.skyBg}
            alt="واجهة اللعبة"
            loading="lazy"
            width={1024}
            height={768}
            className="h-28 w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_left,transparent,color-mix(in_oklab,var(--background)_78%,transparent))]" />
          <div className="absolute inset-y-0 right-0 flex flex-col justify-center gap-1 p-4">
            <span className="flex items-center gap-1.5 font-display text-sm font-extrabold text-foreground">
              <BadgeCheck className="h-4 w-4 text-success" /> تفعيل مضمون
            </span>
            <span className="text-[0.68rem] text-muted-foreground">
              بعد الإيداع يعمل السكريبت مباشرة
            </span>
          </div>
        </motion.div>

        {/* ID entry */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-4 rounded-3xl border border-primary/12 bg-card p-4 shadow-[var(--shadow-card)]"
        >
          <label
            htmlFor="userid"
            className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground"
          >
            <IdCard className="h-3.5 w-3.5" /> User ID
          </label>
          <input
            id="userid"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="أدخل الـ ID الخاص بك"
            className="mt-2.5 w-full rounded-2xl border border-primary/12 bg-secondary/60 px-4 py-3.5 text-sm font-medium text-foreground outline-none transition-all placeholder:font-normal placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/12"
          />
          <p className="mt-2.5 flex items-center gap-1.5 text-[0.66rem] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> بياناتك محمية ولا تُشارك مع أي طرف
          </p>
        </motion.div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          disabled={!ready}
          onClick={() => onComplete(id.trim())}
          className="group mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[image:var(--gradient-accent)] px-4 py-4 font-display text-base font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:bg-none disabled:bg-secondary disabled:text-muted-foreground disabled:shadow-none"
        >
          إكمال
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
}
