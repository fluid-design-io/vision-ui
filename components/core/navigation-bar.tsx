"use client";

import { cn } from "@/lib/utils";
import { Text } from "../ui/typography";
import { useWindowScroll } from "./window";
import { motion, useTransform } from "framer-motion";

const NavigationBar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { scrollY } = useWindowScroll();
  const blurOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 z-30 inline-flex h-[92px] w-full items-center justify-between overflow-hidden rounded-t-[--radius] px-6",
        className,
      )}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-[-4px] z-[-1] backdrop-blur",
          "[mask:linear-gradient(black,black_44px,transparent)]",
        )}
        style={{
          opacity: blurOpacity,
        }}
      />
      {children}
    </div>
  );
};

const NavigationBarTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex h-full items-center justify-center text-[29px] font-bold",
        className,
      )}
    >
      <Text size="largeTitle" asChild>
        <h1>{children}</h1>
      </Text>
    </div>
  );
};

export { NavigationBar, NavigationBarTitle };
