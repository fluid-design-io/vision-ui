"use client";

import bg_night from "@/public/assets/background-night.png";
import bg_day from "@/public/assets/background-day.png";

import Image from "next/image";

import { useAtom, atom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const isDayAtom = atom(false);

export const HeroBackground = () => {
  const [isDay] = useAtom(isDayAtom);
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1] h-full w-full",
        "after:absolute after:inset-0 after:z-[3] after:overflow-hidden after:rounded-[--tile-radius] after:[box-shadow:inset_0_0_16px_16px_hsl(var(--background))]",
      )}
    >
      <AnimatePresence>
        {isDay ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            key="day"
          >
            <Image
              src={bg_day}
              alt="background"
              unoptimized
              className="absolute inset-0 h-full w-full rounded-[--tile-radius] object-cover p-1.5"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            key="night"
          >
            <Image
              src={bg_night}
              alt="background"
              unoptimized
              className="absolute inset-0 z-[1] h-full w-full rounded-3xl object-cover p-1.5"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
