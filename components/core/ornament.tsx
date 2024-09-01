"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Window, WindowProps } from "./window";
import { Text } from "../ui/typography";
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

/* 

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
            transition={CONSTANTS.ORNAMENT_TRANSITION_CONFIG}
*/

const VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...CONSTANTS.ORNAMENT_TRANSITION_CONFIG,
      delay: 0.38,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

// Create a context for the active tab
const OrnamentContext = createContext<{
  activeTab: string;
  isExpanded: boolean;
  isMouseDown: boolean;
  contentClassName?: string;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setContentClassName: React.Dispatch<React.SetStateAction<string>>;
  handleOrnamentItemClick: () => void;
  handleOrnamentItemMouseDown: () => void;
  handleOrnamentItemMouseUp: () => void;
  handleOrnamentItemFocus: () => void;
  handleOrnamentItemBlur: () => void;
}>({
  activeTab: "",
  isExpanded: false,
  isMouseDown: false,
  contentClassName: "",
  setIsMouseDown: () => {},
  setActiveTab: () => {},
  setIsExpanded: () => {},
  setContentClassName: () => {},
  handleOrnamentItemClick: () => {},
  handleOrnamentItemMouseDown: () => {},
  handleOrnamentItemMouseUp: () => {},
  handleOrnamentItemFocus: () => {},
  handleOrnamentItemBlur: () => {},
});

export function useOrnament() {
  const context = useContext(OrnamentContext);
  if (!context) {
    throw new Error("useOrnament must be used within a OrnamentContext");
  }
  return context;
}

const Ornament = ({
  children,
  className,
  defaultTab,
}: {
  children: React.ReactNode;
  className?: string;
  defaultTab?: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const timeoutEnterRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutLeaveRef = useRef<NodeJS.Timeout | null>(null);
  const [contentClassName, setContentClassName] = useState("");
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
        contentClassName,
        setIsMouseDown,
        setActiveTab,
        setIsExpanded,
        setContentClassName,
        handleOrnamentItemClick,
        handleOrnamentItemMouseDown,
        handleOrnamentItemMouseUp,
        handleOrnamentItemFocus,
        handleOrnamentItemBlur,
      }}
    >
      <Tabs
        orientation="vertical"
        onValueChange={setActiveTab}
        value={activeTab}
        className={cn(
          "relative ml-[-96px] grid h-full w-full flex-1 grid-cols-[68px_1fr] place-items-center gap-7",
          "max-w-3xl xl:max-w-4xl 2xl:max-w-6xl",
          className,
        )}
      >
        {children}
      </Tabs>
    </OrnamentContext.Provider>
  );
};

const OrnamentTabs = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const {
    isExpanded,
    isMouseDown,
    handleOrnamentItemFocus,
    handleOrnamentItemBlur,
  } = useOrnament();

  return (
    <div className="flex items-center">
      <Window
        className="hide-scrollbar absolute left-0 z-50 mx-auto flex items-center justify-start p-3"
        initial={{
          scale: 1,
        }}
        animate={{
          scale: isMouseDown ? 1 : isExpanded ? 1.05 : 1,
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
};

const OrnamentTrigger = ({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick?: () => void;
}) => {
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
    >
      <TabsTrigger value={value} asChild>
        <Button
          className="flex w-full items-center justify-stretch rounded-full px-[10px]"
          onClick={handleClick}
          onMouseDown={handleOrnamentItemMouseDown}
          onMouseUp={handleOrnamentItemMouseUp}
          onFocus={handleOrnamentItemFocus}
          onBlur={handleOrnamentItemBlur}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant={variant}
        >
          <div className="relative mr-4 flex-shrink-0">{icon}</div>
          <motion.span
            className="flex-1 overflow-hidden text-start"
            initial={{
              width: 0,
            }}
            animate={{
              width: isExpanded ? "auto" : 0,
            }}
            transition={CONSTANTS.TEXT_TRANSITION_CONFIG}
          >
            <Text
              size="title3"
              variant={isHovered ? "default" : variant}
              className="font-medium leading-[24px]"
            >
              {label}
            </Text>
          </motion.span>
        </Button>
      </TabsTrigger>
    </motion.div>
  );
};

const OrnamentContents = ({
  children,
  contentClassName,
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) => {
  const { setContentClassName } = useOrnament();
  React.useEffect(() => {
    if (contentClassName) {
      setContentClassName(contentClassName);
    }
  }, [contentClassName, setContentClassName]);

  return children;
};

interface OrnamentContentProps extends WindowProps {
  value: string;
  /**
   * Rendered at the top of the content. Can be a React Component (e.g. SomeComponent), or a React element (e.g. <SomeComponent />).
   */
  HeaderComponent?: React.ReactNode | React.ComponentType;
  /**
   * Rendered at the bottom of the content. Can be a React Component (e.g. SomeComponent), or a React element (e.g. <SomeComponent />).
   */
  FooterComponent?: React.ReactNode | React.ComponentType;
}

const OrnamentContent = ({
  value,
  HeaderComponent,
  FooterComponent,
  ...props
}: OrnamentContentProps) => {
  const { activeTab, contentClassName } = useOrnament();
  const isActive = activeTab === value;
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isActive && (
        <TabsContent
          value={value}
          key={`ornament-content-${value}-active`}
          forceMount
          className="flex w-full flex-col"
        >
          {HeaderComponent &&
            (typeof HeaderComponent === "function" ? (
              <HeaderComponent />
            ) : (
              HeaderComponent
            ))}
          <Window
            className={contentClassName}
            scroll
            initial={VARIANTS.hidden}
            animate={VARIANTS.visible}
            exit={VARIANTS.exit}
            transition={CONSTANTS.ORNAMENT_TRANSITION_CONFIG}
            {...props}
          />
          {FooterComponent && (
            <motion.div
              initial={VARIANTS.hidden}
              animate={VARIANTS.visible}
              exit={VARIANTS.exit}
              transition={CONSTANTS.ORNAMENT_TRANSITION_CONFIG}
              className="z-[51] flex items-center justify-center"
            >
              {typeof FooterComponent === "function" ? (
                <FooterComponent />
              ) : (
                FooterComponent
              )}
            </motion.div>
          )}
        </TabsContent>
      )}
    </AnimatePresence>
  );
};

export {
  Ornament,
  OrnamentTabs,
  OrnamentTrigger,
  OrnamentContents,
  OrnamentContent,
};
