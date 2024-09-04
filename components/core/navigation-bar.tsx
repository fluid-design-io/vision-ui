"use client";

import { cn } from "@/lib/utils";
import { Text } from "../ui/typography";
import { useWindowScroll } from "./window";
import { motion, useTransform } from "framer-motion";
import { cva, VariantProps } from "class-variance-authority";

const navigationBarTitleVariants = cva(
  "pointer-events-none text-[29px] font-bold",
  {
    variants: {
      variant: {
        leading: "",
        center: "absolute inset-0 flex h-full items-center justify-center",
      },
      /**
       * Show the title after scroll
       */
      reveal: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "center",
      reveal: false,
    },
  },
);

interface NavigationBarProps {
  className?: string;
  children: React.ReactNode;
}

interface NavigationBarTitleProps
  extends VariantProps<typeof navigationBarTitleVariants> {
  children: string;
}

const NavigationBar = ({ className, children }: NavigationBarProps) => {
  const { scrollY } = useWindowScroll();
  const blurOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  return (
    <div
      className={cn(
        "absolute inset-x-[-1px] top-[-1px] isolate z-[41] inline-flex h-[92px] items-center justify-between overflow-hidden rounded-t-[--radius] px-6",
        className,
      )}
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

const NavigationBarTitle = ({
  variant = "center",
  reveal = false,
  children,
}: NavigationBarTitleProps) => {
  const { scrollY } = useWindowScroll();
  const opacity = useTransform(scrollY, [100, 180], [0, 0.96]);
  return (
    <motion.div
      className={cn(navigationBarTitleVariants({ variant }))}
      style={{
        opacity: reveal ? opacity : 1,
      }}
    >
      <Text size="largeTitle" asChild>
        <h1>{children}</h1>
      </Text>
    </motion.div>
  );
};

export { NavigationBar, NavigationBarTitle };
