import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Splash } from "@/components/screens/Splash";
import { PlatformSelect, type Platform } from "@/components/screens/PlatformSelect";
import { Terms } from "@/components/screens/Terms";
import { AviatorGame } from "@/components/screens/AviatorGame";
import { AppleOfFortune } from "@/components/screens/AppleOfFortune";
import { GameSelectDialog, type GameKind } from "@/components/screens/GameSelectDialog";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Win Script — Aviator Signals for Winwin & Greenbet" },
      {
        name: "description",
        content:
          "Win Script: activate on Winwin or Greenbet, then run the Aviator predictor to see the cash-out multiplier.",
      },
      { property: "og:title", content: "Win Script — Aviator Signals" },
      {
        property: "og:description",
        content: "Activate on Winwin or Greenbet and get your Aviator cash-out multiplier.",
      },
    ],
  }),
  component: Index,
});

type Screen = "splash" | "platform" | "terms" | "crash" | "apple";

function Index() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [platform, setPlatform] = useState<Platform>("Coldbet");
  const [userId, setUserId] = useState("");
  const [picking, setPicking] = useState(false);
  const goPlatform = useCallback(() => setScreen("platform"), []);

  const pick = (g: GameKind) => {
    setPicking(false);
    setScreen(g === "apple" ? "apple" : "crash");
  };

  return (
    <main className="min-h-dvh bg-background font-sans text-foreground">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {screen === "splash" && <Splash onDone={goPlatform} />}
          {screen === "platform" && (
            <PlatformSelect
              onSelect={(p) => {
                setPlatform(p);
                setScreen("terms");
              }}
            />
          )}
          {screen === "terms" && (
            <Terms
              platform={platform}
              onComplete={(id) => {
                setUserId(id);
                setPicking(true);
              }}
            />
          )}
          {screen === "crash" && (
            <AviatorGame platform={platform} userId={userId} onBack={() => setPicking(true)} />
          )}
          {screen === "apple" && (
            <AppleOfFortune platform={platform} userId={userId} onBack={() => setPicking(true)} />
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>{picking && <GameSelectDialog onPick={pick} />}</AnimatePresence>

    </main>
  );
}
