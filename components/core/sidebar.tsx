"use client";

import { cn } from "@/lib/utils";
import React, { HTMLAttributes, useImperativeHandle, useRef } from "react";
import { Text } from "../ui/typography";
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import View from "./view";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}
interface HeaderTitleProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {
  children: string;
}
interface SidebarProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const SidebarContext = React.createContext<{
  scrollY: MotionValue<number>;
}>({
  scrollY: new MotionValue(),
});

const useSidebarScroll = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarContext");
  }
  return context;
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, children, ...props }: SidebarProps, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current!);
    const { scrollY } = useScroll({ container: localRef });
    const blurOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    return (
      <SidebarContext.Provider value={{ scrollY }}>
        <View asChild>
          <motion.div
            className={cn(
              "relative flex flex-col overflow-y-auto overflow-x-hidden",
              className,
            )}
            {...props}
            ref={localRef}
          >
            <motion.div
              // TODO: Alternative variable blur effect: https://codepen.io/silas/pen/rNYqZoz
              className={cn(
                "pointer-events-none absolute inset-[-4px] z-[-1] backdrop-blur backdrop-brightness-95",
                "[mask:linear-gradient(black,black_68px,transparent)]",
              )}
              style={{
                opacity: blurOpacity,
              }}
            />
            {children}
          </motion.div>
        </View>
      </SidebarContext.Provider>
    );
  },
);

const SidebarHeader = ({ className, children, ...props }: HeaderProps) => {
  const { scrollY } = useSidebarScroll();
  const blurOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  return (
    <div
      className={cn(
        "absolute inset-x-[-1px] top-[-1px] isolate z-[41] inline-flex h-[92px] items-center justify-between overflow-hidden rounded-t-[--radius] px-6",
        className,
      )}
      {...props}
    >
      <motion.div
        // TODO: Alternative variable blur effect: https://codepen.io/silas/pen/rNYqZoz
        className={cn(
          "pointer-events-none absolute inset-[-4px] z-[-1] backdrop-blur backdrop-brightness-95",
          "[mask:linear-gradient(black,black_68px,transparent)]",
        )}
        style={{
          opacity: blurOpacity,
        }}
      />
      {children}
    </div>
  );
};

const SidebarHeaderTitle = ({
  className,
  children,
  ...props
}: HeaderTitleProps) => {
  return (
    <Text
      className={cn("pointer-events-none text-[29px] font-bold", className)}
      size="largeTitle"
      asChild
      {...props}
    >
      <h1>{children}</h1>
    </Text>
  );
};

export { Sidebar, SidebarHeader, SidebarHeaderTitle };
