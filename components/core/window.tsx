"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion, MotionValue } from "framer-motion";
import { useScroll } from "framer-motion";
import React, { useImperativeHandle, useRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

type GlassThickness =
  | "none"
  | "thinnest"
  | "thinner"
  | "thin"
  | "normal"
  | "thick"
  | "thicker"
  | "thickest";

interface WindowApiProps {
  /**
   * Wrap content in a scroll area.
   *
   * You can use `useWindowScroll` to get the scroll position of the window in the children.
   * @default false
   */
  scroll?: boolean;
  /**
   * The thickness of the glass effect.
   * @default "normal"
   */
  thickness?: GlassThickness;
}

interface WindowProps extends HTMLMotionProps<"div">, WindowApiProps {
  children: React.ReactNode;
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
  SATURATION: 2,
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

const WindowContext = React.createContext<{
  scrollY: MotionValue<number>;
}>({
  scrollY: new MotionValue(),
});

const useWindowScroll = () => {
  const context = React.useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowContext");
  }
  return context;
};

const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      children,
      className,
      thickness,
      style,
      scroll = false,
      ...props
    }: WindowProps,
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);

    // strip out *-h-*, h-* classes classes
    const scrollWindowRegex =
      /-h-.*|^h-.*|^max-h-.*|^min-h-.*|^h-.*|h-.*|max-h-.*|min-h-.*/g;
    const scrollWindowClassesName =
      className?.match(scrollWindowRegex)?.join(" ") || "";
    const restClassesName = className?.replace(scrollWindowRegex, "") || "";

    // get rounded-* classes
    const roundedRegex = /rounded-.*|^rounded/g;
    const roundedClassesName = className?.match(roundedRegex)?.join(" ") || "";

    useImperativeHandle(ref, () => localRef.current!);

    const { scrollY } = useScroll({
      container: scroll ? localRef : undefined,
      layoutEffect: false,
    });

    return (
      <WindowContext.Provider value={{ scrollY }}>
        <motion.div
          className={cn(
            "relative z-40 overflow-hidden",
            "before:absolute before:inset-0 before:z-[-1] before:rounded-[34px] before:bg-[#808080] before:bg-opacity-30",
            "min-h-[64px] min-w-[64px]",
            CONSTANTS.VAR_DIAMETER,
            CONSTANTS.VAR_RADIUS,
            restClassesName,
            !scroll && scrollWindowClassesName,
          )}
          style={{
            backdropFilter:
              thickness === "none"
                ? "none"
                : `saturate(${CONSTANTS.SATURATION}) blur(${getThickness(thickness || "normal")}px)`,
            WebkitBackdropFilter:
              thickness === "none"
                ? "none"
                : `saturate(${CONSTANTS.SATURATION}) blur(${getThickness(thickness || "normal")}px)`,
            borderRadius: CONSTANTS.BORDER_RADIUS,
            ...style,
          }}
          {...props}
        >
          {/* HIGHLIGHTRINGS */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 z-40 h-full w-full"
            style={{
              boxShadow: getRings(thickness || "normal"),
              borderRadius: CONSTANTS.BORDER_RADIUS,
              top: 0,
            }}
            aria-hidden
          />
          <motion.div
            className={cn(
              getHighlightStroke(thickness || "normal"),
              "pointer-events-none absolute inset-[-0.75px] z-40",
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
              "pointer-events-none absolute inset-[-0.25px] z-40",
              "[--mask-inner-distance:calc(50%-var(--mask-stroke)-var(--mask-stroke))] [--mask-outer-distance:calc(50%-var(--mask-stroke))]",
            )}
            style={{
              ...rightBottomHighlightStyle,
              opacity: getHighlightOpacity(thickness || "normal") - 0.05,
            }}
            aria-hidden="true"
          />

          {scroll ? (
            <ScrollAreaPrimitive.Root
              className={cn("relative", scrollWindowClassesName)}
            >
              <ScrollAreaPrimitive.Viewport
                className={cn(
                  "h-full w-full",
                  roundedClassesName.length > 0
                    ? roundedClassesName
                    : "rounded-[34px]",
                  {
                    "!overflow-visible": scrollWindowClassesName.length === 0,
                  },
                )}
                ref={localRef}
              >
                {children}
              </ScrollAreaPrimitive.Viewport>
              <ScrollBar />
              <ScrollAreaPrimitive.Corner />
            </ScrollAreaPrimitive.Root>
          ) : (
            children
          )}
        </motion.div>
      </WindowContext.Provider>
    );
  },
);

Window.displayName = "Window";

const WindowControls = () => {
  return (
    <motion.div
      className="z-50 inline-flex h-[37px] w-[212px] shrink-0 items-center justify-start gap-6 pb-px pr-[38px] pt-[22px]"
      layout
    >
      <div className="relative h-3.5 w-3.5 rounded-[100px] bg-white/30 backdrop-blur-[20px]"></div>
      <div className="relative h-2.5 w-[136px] rounded-[100px] bg-white/30 backdrop-blur-[20px]"></div>
    </motion.div>
  );
};

export { Window, WindowControls, useWindowScroll };
export type { WindowProps, WindowApiProps, GlassThickness };
