"use client";

import { cn } from "@/lib/utils";
import { motion, MotionStyle } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export enum GlassThickness {
  none = "none",
  thinnest = "thinnest",
  thinner = "thinner",
  thin = "thin",
  normal = "normal",
  thick = "thick",
  thicker = "thicker",
  thickest = "thickest",
}

export type BoxProps = {
  children: React.ReactNode;
  className?: string;
  thickness?: GlassThickness;
  style?: MotionStyle;
};

export const getThickness = (thickness: GlassThickness) => {
  switch (thickness) {
    case GlassThickness.none:
      return 0;
    case GlassThickness.thinnest:
      return 24;
    case GlassThickness.thinner:
      return 32;
    case GlassThickness.thin:
      return 42;
    case GlassThickness.normal:
      return 48;
    case GlassThickness.thick:
      return 64;
    case GlassThickness.thicker:
      return 72;
    case GlassThickness.thickest:
      return 96;
    default:
      return 32;
  }
};

export const getRings = (thickness: GlassThickness) => {
  switch (thickness) {
    case GlassThickness.none:
      return "none";
    case GlassThickness.thinnest:
      return "0px 3px 6.5px 0px rgba(0, 0, 0, 0.05), -0.15px 0.15px 0.15px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.15px 2px 0px rgba(255, 255, 255, 0.35) inset";
    case GlassThickness.thinner:
      return "0px 4px 8px 0px rgba(0, 0, 0, 0.05), -0.25px 0.25px 0.25px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.25px 2px 0px rgba(255, 255, 255, 0.35) inset";
    case GlassThickness.thin:
      return "0px 6px 10px 0px rgba(0, 0, 0, 0.05), -0.35px 0.35px 0.35px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.35px 2px 0px rgba(255, 255, 255, 0.35) inset";
    case GlassThickness.normal:
      return "0px 8px 12px 0px rgba(0, 0, 0, 0.05), -0.45px 0.45px 0.45px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.45px 2px 0px rgba(255, 255, 255, 0.35) inset";
    case GlassThickness.thick:
      return "0px 12px 16px 0px rgba(0, 0, 0, 0.05), -0.65px 0.65px 0.65px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.65px 2px 0px rgba(255, 255, 255, 0.35) inset";
    case GlassThickness.thicker:
      return "0px 18px 22px 0px rgba(0, 0, 0, 0.05), -0.75px 0.75px 0.75px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.75px 6px 0px rgba(255, 255, 255, 0.35) inset";
    case GlassThickness.thickest:
      return "0px 24px 28px 0px rgba(0, 0, 0, 0.05), -0.85px 0.85px 0.85px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.85px 6px 0px rgba(255, 255, 255, 0.35) inset";
    default:
      return "0px 4px 8px 0px rgba(0, 0, 0, 0.05), -0.25px 0.25px 0.25px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.25px 2px 0px rgba(255, 255, 255, 0.35) inset";
  }
};

function Box({ children, className, thickness, style }: BoxProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: viewRef,
  });
  return (
    <motion.div
      ref={viewRef}
      className={cn(
        "bg-white/5 backdrop-blur-2xl",
        "backdrop-brightness-125 backdrop-saturate-[1.035]",
        "text-lg font-semibold text-white/95",
        "border border-b-white/10 border-l-white/10 border-r-white/5 border-t-white/5",
        "hide-scrollbar relative",
        className,
      )}
      style={{
        backdropFilter:
          thickness === GlassThickness.none
            ? "none"
            : `brightness(1.25) saturate(1.035) blur(${getThickness(
                thickness || GlassThickness.normal,
              )}px)`,
        borderRadius: 32,
        ...style,
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 z-10 h-full w-full"
        style={{
          boxShadow: getRings(thickness || GlassThickness.normal),
          borderRadius: 32,
          top: scrollY,
        }}
      />
      {children}
    </motion.div>
  );
}

export default Box;
