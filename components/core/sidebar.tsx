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
  /**
   * The header of the sidebar.
   */
  header?: React.ReactNode;
  /**
   * The root className of the sidebar wrapper.
   */
  rootClassName?: string;
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
  (
    {
      className,
      children,
      header = null,
      rootClassName,
      ...props
    }: SidebarProps,
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current!);
    const { scrollY } = useScroll({ container: localRef });
    return (
      <SidebarContext.Provider value={{ scrollY }}>
        <div
          className={cn(
            "relative flex flex-col [--sidebar-header-height:84px]",
            rootClassName,
          )}
        >
          {header}
          <View asChild>
            <motion.div
              className={cn(
                "[&::-webkit-scrollbar]:hidden",
                "relative flex flex-col overflow-y-auto overflow-x-hidden",
                "-mt-[calc(var(--sidebar-header-height)/2)] pt-[calc(var(--sidebar-header-height)/2)]",
                "[mask:linear-gradient(to_bottom,transparent,black_var(--sidebar-header-height),black)]",
                className,
              )}
              {...props}
              ref={localRef}
            >
              {React.Children.map(children, (child) => {
                if (
                  React.isValidElement(child) &&
                  child.type !== SidebarHeader
                ) {
                  return child;
                }
              })}
            </motion.div>
          </View>
        </div>
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
        "sticky top-0 z-[41] inline-flex min-h-[var(--sidebar-header-height)] shrink-0 items-center justify-between overflow-hidden rounded-tl-[--radius] px-4",
        className,
      )}
      {...props}
    >
      <motion.div
        // TODO: Alternative variable blur effect: https://codepen.io/silas/pen/rNYqZoz
        className={cn(
          "pointer-events-none absolute inset-x-0 inset-y-[-4px] z-[-1] backdrop-blur",
          "[mask:linear-gradient(black,black_50px,transparent)]",
        )}
        style={{
          opacity: blurOpacity,
        }}
      />
      {children}
    </div>
  );
};

SidebarHeader.displayName = "SidebarHeader";

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
SidebarHeaderTitle.displayName = "SidebarHeaderTitle";

export { Sidebar, SidebarHeader, SidebarHeaderTitle };
