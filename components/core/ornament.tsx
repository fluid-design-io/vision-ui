"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Window } from "./window";
import { Text, textStyles } from "../ui/typography";
import { Button } from "../ui/button";

const CONSTANTS = {
  EXPANDED_WIDTH: "100%",
  COLLAPSED_WIDTH: 44,
  ENTERANCE_TIMEOUT: 700,
  EXITANCE_TIMEOUT: 500,
  TEXT_TRANSITION_CONFIG: {
    duration: 0.4,
  },
  ORNAMENT_TRANSITION_CONFIG: {
    type: "spring",
    bounce: 0,
    duration: 0.7,
  },
};

// Create a context for the active tab
const OrnamentContext = createContext<{
  activeTab: string;
  isExpanded: boolean;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  handleOrnamentItemClick: () => void;
  handleOrnamentItemMouseDown: () => void;
  handleOrnamentItemMouseUp: () => void;
  handleOrnamentItemFocus: () => void;
  handleOrnamentItemBlur: () => void;
}>({
  activeTab: "",
  isExpanded: false,
  isMouseDown: false,
  setIsMouseDown: () => {},
  setActiveTab: () => {},
  setIsExpanded: () => {},
  handleOrnamentItemClick: () => {},
  handleOrnamentItemMouseDown: () => {},
  handleOrnamentItemMouseUp: () => {},
  handleOrnamentItemFocus: () => {},
  handleOrnamentItemBlur: () => {},
});

export function useOrnament() {
  return useContext(OrnamentContext);
}

export function Ornament({
  children,
  className,
  defaultTab,
}: {
  children: React.ReactNode;
  className?: string;
  defaultTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
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

  const handleOrnamentItemMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleOrnamentItemMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleOrnamentItemClick = () => {
    if (timeoutEnterRef.current) clearTimeout(timeoutEnterRef.current);
    if (timeoutLeaveRef.current) clearTimeout(timeoutLeaveRef.current);
  };

  const handleOrnamentItemFocus = () => {
    handleMouseEnter();
  };

  const handleOrnamentItemBlur = () => {
    handleMouseLeave();
  };
  return (
    <OrnamentContext.Provider
      value={{
        activeTab,
        isExpanded,
        isMouseDown,
        setIsMouseDown,
        setActiveTab,
        setIsExpanded,
        handleOrnamentItemClick,
        handleOrnamentItemMouseDown,
        handleOrnamentItemMouseUp,
        handleOrnamentItemFocus,
        handleOrnamentItemBlur,
      }}
    >
      <Tabs
        onValueChange={setActiveTab}
        value={activeTab}
        className={cn(
          "relative ml-[-96px] grid h-full w-full max-w-5xl flex-1 grid-cols-[68px_1fr] place-items-center gap-7",
          className,
        )}
      >
        {children}
      </Tabs>
    </OrnamentContext.Provider>
  );
}

export function OrnamentTabs({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const {
    isExpanded,
    isMouseDown,
    handleOrnamentItemFocus,
    handleOrnamentItemBlur,
  } = useOrnament();

  return (
    <div className="flex items-center">
      <Window
        className="absolute left-0 z-50 mx-auto flex items-center justify-start p-3"
        initial={{
          scale: 1,
        }}
        animate={{
          scale: isMouseDown ? 1 : isExpanded ? 1.03 : 1,
        }}
        transition={CONSTANTS.ORNAMENT_TRANSITION_CONFIG}
      >
        <TabsList asChild>
          <motion.div
            onMouseEnter={handleOrnamentItemFocus}
            onMouseLeave={handleOrnamentItemBlur}
            className={cn("flex flex-col items-start gap-2", className)}
          >
            {children}
          </motion.div>
        </TabsList>
      </Window>
    </div>
  );
}

export function OrnamentTrigger({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick?: () => void;
}) {
  const {
    activeTab,
    setActiveTab,
    isExpanded,
    handleOrnamentItemClick,
    handleOrnamentItemMouseDown,
    handleOrnamentItemMouseUp,
    handleOrnamentItemFocus,
    handleOrnamentItemBlur,
  } = useOrnament();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setActiveTab(value);
    handleOrnamentItemClick();
    onClick?.();
  };

  const isActive = activeTab === value;
  const variant = isHovered ? "default" : isActive ? "default" : "secondary";

  return (
    <motion.div
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
      <TabsTrigger value={value} asChild>
        <Button
          className="flex w-full items-center justify-stretch rounded-full"
          onClick={handleClick}
          onMouseDown={handleOrnamentItemMouseDown}
          onMouseUp={handleOrnamentItemMouseUp}
          onFocus={handleOrnamentItemFocus}
          onBlur={handleOrnamentItemBlur}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant={variant}
        >
          <span className="relative mr-4 inline-block flex-shrink-0">
            <span
              className={cn(textStyles[isHovered ? "default" : variant].top)}
            >
              {icon}
            </span>
            <span
              className={cn(
                "absolute inset-0 z-[-1]",
                textStyles[isHovered ? "default" : variant].bottom,
              )}
            >
              {icon}
            </span>
          </span>

          <motion.span
            className="flex-1 overflow-hidden text-start"
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              width: isExpanded ? "auto" : 0,
            }}
            transition={CONSTANTS.TEXT_TRANSITION_CONFIG}
          >
            <Text variant={isHovered ? "default" : "secondary"}>{label}</Text>
          </motion.span>
        </Button>
      </TabsTrigger>
    </motion.div>
  );
}

export function OrnamentContents({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("h-full w-full", className)}>{children}</div>;
}

export function OrnamentContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { activeTab } = useOrnament();
  const isActive = activeTab === value;
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isActive && (
        <TabsContent
          value={value}
          key={`ornament-content-${value}-active`}
          forceMount
          className="h-full w-full"
        >
          <Window
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ...CONSTANTS.ORNAMENT_TRANSITION_CONFIG,
                delay: 0.38,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            transition={CONSTANTS.ORNAMENT_TRANSITION_CONFIG}
          >
            {children}
          </Window>
        </TabsContent>
      )}
    </AnimatePresence>
  );
}
