"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export type GlassThickness =
  | "none"
  | "thinnest"
  | "thinner"
  | "thin"
  | "normal"
  | "thick"
  | "thicker"
  | "thickest";

export interface BoxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  thickness?: GlassThickness;
}

export const getThickness = (thickness: GlassThickness) => {
  switch (thickness) {
    case "none":
      return 0;
    case "thinnest":
      return 24;
    case "thinner":
      return 32;
    case "thin":
      return 42;
    case "normal":
      return 48;
    case "thick":
      return 64;
    case "thicker":
      return 72;
    case "thickest":
      return 96;
    default:
      return 32;
  }
};

export const getRings = (thickness: GlassThickness) => {
  switch (thickness) {
    case "none":
      return "none";
    case "thinnest":
      return "0px 3px 6.5px 0px rgba(0, 0, 0, 0.05), -0.25px 0.35px 0.15px -1.5px rgba(255, 255, 255, 0.15) inset, 0px 0.35px 2px 0px rgba(255, 255, 255, 0.15) inset";
    case "thinner":
      return "0px 4px 8px 0px rgba(0, 0, 0, 0.05), -0.35px 0.55px 0.25px -1.5px rgba(255, 255, 255, 0.2) inset, 0px 0.55px 2px 0px rgba(255, 255, 255, 0.2) inset";
    case "thin":
      return "0px 6px 10px 0px rgba(0, 0, 0, 0.05), -0.45px 0.75px 0.35px -1.5px rgba(255, 255, 255, 0.25) inset, 0px 0.75px 2px 0px rgba(255, 255, 255, 0.25) inset";
    case "normal":
      return "0px 8px 12px 0px rgba(0, 0, 0, 0.05), -0.55px 1px 0.45px -1.5px rgba(255, 255, 255, 0.3) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.3) inset";
    case "thick":
      return "0px 12px 16px 0px rgba(0, 0, 0, 0.05), -0.65px 1.25px 0.65px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.25px 2px 0px rgba(255, 255, 255, 0.35) inset";
    case "thicker":
      return "0px 18px 22px 0px rgba(0, 0, 0, 0.05), -0.75px 1.75px 0.75px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.75px 6px 0px rgba(255, 255, 255, 0.35) inset";
    case "thickest":
      return "0px 24px 28px 0px rgba(0, 0, 0, 0.05), -0.85px 1.85px 0.85px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.85px 6px 0px rgba(255, 255, 255, 0.35) inset";
    default:
      return "0px 4px 8px 0px rgba(0, 0, 0, 0.05), -0.25px 0.5px 0.25px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 0.5px 2px 0px rgba(255, 255, 255, 0.35) inset";
  }
};

export const getHighlightStroke = (thickness: GlassThickness) => {
  switch (thickness) {
    case "none":
      return "[--mask-stroke:0px]";
    case "thinnest":
      return "[--mask-stroke:0.75px]";
    case "thinner":
      return "[--mask-stroke:1px]";
    case "thin":
      return "[--mask-stroke:1.25px]";
    case "normal":
      return "[--mask-stroke:1.5px]";
    case "thick":
      return "[--mask-stroke:1.75px]";
    case "thicker":
      return "[--mask-stroke:1.85px]";
    case "thickest":
      return "[--mask-stroke:1.9px]";
    default:
      return "[--mask-stroke:1.5px]";
  }
};

const getHighlightOpacity = (thickness: GlassThickness) => {
  switch (thickness) {
    case "none":
      return 0;
    case "thinnest":
      return 0.15;
    case "thinner":
      return 0.175;
    case "thin":
      return 0.2;
    case "normal":
      return 0.225;
    case "thick":
      return 0.25;
    case "thicker":
      return 0.275;
    case "thickest":
      return 0.3;
    default:
      return 0.225;
  }
};

const CONSTANTS = {
  BORDER_RADIUS: 34,
  VAR_RADIUS: "[--radius:34px]",
  VAR_DIAMETER: "[--diameter:68px]",
};

const maskComposite = [
  "exclude",
  "intersect",
  "subtract",
  "intersect",
  "subtract",
  "add",
];

const defaultHighlightStyle = {
  borderRadius: CONSTANTS.BORDER_RADIUS,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

const leftTopHighlight =
  "conic-gradient(from 270deg at var(--radius) var(--radius), transparent 0deg, white 45deg, transparent 170deg), transparent";
const leftTopMaskImage = [
  "linear-gradient(to right, black, black)",
  "linear-gradient(to right, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to bottom, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to right, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "linear-gradient(to bottom, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "radial-gradient(var(--diameter) var(--diameter) at var(--radius) var(--radius), black var(--mask-inner-distance), transparent var(--mask-outer-distance))",
];
const leftTopHighlightStyle = {
  background: leftTopHighlight,
  maskImage: leftTopMaskImage.join(", "),
  maskComposite: maskComposite.join(", "),
  ...defaultHighlightStyle,
};

const rightBottomHighlight =
  "conic-gradient(from 60deg at var(--radius) var(--radius), transparent 0deg, white 65deg, transparent 160deg), transparent";
const rightBottomMaskImage = [
  "linear-gradient(to left, black, black)",
  "linear-gradient(to left, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to top, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to left, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "linear-gradient(to top, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "radial-gradient(var(--diameter) var(--diameter) at calc(100% - var(--radius)) calc(100% - var(--radius)), black var(--mask-inner-distance), transparent var(--mask-outer-distance))",
];
const rightBottomHighlightStyle = {
  background: rightBottomHighlight,
  maskImage: rightBottomMaskImage.join(", "),
  maskComposite: maskComposite.join(", "),
  ...defaultHighlightStyle,
};

export function Window({
  children,
  className,
  thickness,
  style,
  ...props
}: BoxProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: viewRef,
  });
  return (
    <motion.div
      ref={viewRef}
      className={cn(
        "hide-scrollbar relative",
        "bg-[#808080] bg-opacity-30",
        "after:absolute after:inset-[-0.5px] after:z-[-1] after:rounded-[34px] after:content-['']",
        "after:[box-shadow:0_4px_12px_-1px_rgba(30,30,30,0.04),0_2px_2px_0.5px_rgba(0,0,0,0.0.5)]",
        "min-h-[64px] min-w-[64px]",
        CONSTANTS.VAR_DIAMETER,
        CONSTANTS.VAR_RADIUS,
        className,
      )}
      style={{
        backdropFilter:
          thickness === "none"
            ? "none"
            : `brightness(1.35) saturate(1.035) blur(${getThickness(
                thickness || "normal",
              )}px)`,
        borderRadius: CONSTANTS.BORDER_RADIUS,
        ...style,
      }}
      {...props}
    >
      {/* HIGHLIGHTRINGS */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 z-10 h-full w-full"
        style={{
          boxShadow: getRings(thickness || "normal"),
          borderRadius: CONSTANTS.BORDER_RADIUS,
          top: scrollY,
        }}
        aria-hidden
      />
      <motion.div
        className={cn(
          getHighlightStroke(thickness || "normal"),
          "pointer-events-none absolute inset-[-0.75px] z-[-1]",
          "[--mask-inner-distance:calc(50%-var(--mask-stroke)-var(--mask-stroke))] [--mask-outer-distance:calc(50%-var(--mask-stroke))]",
        )}
        style={{
          ...leftTopHighlightStyle,
          opacity: getHighlightOpacity(thickness || "normal") + 0.35,
        }}
        aria-hidden="true"
      />
      <motion.div
        className={cn(
          getHighlightStroke(thickness || "normal"),
          "pointer-events-none absolute inset-[-0.25px] z-[-1]",
          "[--mask-inner-distance:calc(50%-var(--mask-stroke)-var(--mask-stroke))] [--mask-outer-distance:calc(50%-var(--mask-stroke))]",
        )}
        style={{
          ...rightBottomHighlightStyle,
          opacity: getHighlightOpacity(thickness || "normal") - 0.05,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}

export const WindowControls = () => {
  return (
    <div className="inline-flex h-[37px] w-[212px] shrink-0 items-center justify-start gap-6 pb-px pr-[38px] pt-[22px]">
      <div className="relative h-3.5 w-3.5 rounded-[100px] bg-white/30 backdrop-blur-[20px]"></div>
      <div className="relative h-2.5 w-[136px] rounded-[100px] bg-white/30 backdrop-blur-[20px]"></div>
    </div>
  );
};
