"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Window from "./window";

const CONSTANTS = {
  EXPANDED_WIDTH: "100%",
  COLLAPSED_WIDTH: 60,
  ENTERANCE_TIMEOUT: 700,
  EXITANCE_TIMEOUT: 500,
  TEXT_TRANSITION_CONFIG: {
    duration: 0.4,
  },
  ORNAMENT_TRANSITION_CONFIG: {
    type: "spring",
    bounce: 0,
  },
};

// Create a context for the expanded state
const OrnamentContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  handleOrnamentItemClick: () => void;
}>({
  isExpanded: false,
  setIsExpanded: () => {},
  handleOrnamentItemClick: () => {},
});

export function useOrnament() {
  return useContext(OrnamentContext);
}

/**
 * Ornament expands the children horizontally when hovered more than 2 seconds.
 */
export function Ornament({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutEnterRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutLeaveRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseEnter = () => {
    if (timeoutLeaveRef.current) {
      clearTimeout(timeoutLeaveRef.current);
    }
    timeoutEnterRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, CONSTANTS.ENTERANCE_TIMEOUT);
  };

  const handleMouseLeave = () => {
    if (timeoutEnterRef.current) {
      clearTimeout(timeoutEnterRef.current);
    }
    timeoutLeaveRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, CONSTANTS.EXITANCE_TIMEOUT);
  };

  const handleOrnamentItemClick = () => {
    if (timeoutEnterRef.current) clearTimeout(timeoutEnterRef.current);
    if (timeoutLeaveRef.current) clearTimeout(timeoutLeaveRef.current);
  };

  return (
    <Window
      className="mx-auto flex items-center justify-start"
      thickness="normal"
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isExpanded ? 1.03 : 1,
      }}
      transition={CONSTANTS.ORNAMENT_TRANSITION_CONFIG}
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("flex flex-col items-start", className)}
      >
        <OrnamentContext.Provider
          value={{ isExpanded, setIsExpanded, handleOrnamentItemClick }}
        >
          {children}
        </OrnamentContext.Provider>
      </motion.div>
    </Window>
  );
}

export function OrnamentItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  const { isExpanded, handleOrnamentItemClick } = useOrnament();

  const handleClick = () => {
    handleOrnamentItemClick();
    onClick?.();
  };

  return (
    <motion.div
      style={{
        overflow: "hidden",
      }}
      initial={{
        width: CONSTANTS.COLLAPSED_WIDTH,
      }}
      animate={{
        width: isExpanded
          ? CONSTANTS.EXPANDED_WIDTH
          : CONSTANTS.COLLAPSED_WIDTH,
      }}
      transition={CONSTANTS.ORNAMENT_TRANSITION_CONFIG}
      className="relative"
    >
      <Button
        className="flex w-full items-center justify-stretch rounded-full"
        onClick={handleClick}
        variant="ghost"
      >
        <span className="mr-4 flex-shrink-0">{icon}</span>
        <motion.span
          className="flex-1 text-start"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
          transition={CONSTANTS.TEXT_TRANSITION_CONFIG}
        >
          {label}
        </motion.span>
      </Button>
    </motion.div>
  );
}
