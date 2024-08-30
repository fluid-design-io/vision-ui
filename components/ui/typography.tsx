import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export const textStyles = {
  default: {
    top: "text-[rgb(84,84,84)] opacity-0",
    bottom: "text-white opacity-95 transition-all duration-300",
  },
  secondary: {
    top: "text-[rgb(84,84,84)] mix-blend-color-dodge opacity-100",
    bottom:
      "text-white mix-blend-lighten opacity-50 transition-all duration-300",
  },
  tertiary: {
    top: "text-[rgb(94,94,94)] mix-blend-color-dodge opacity-20",
    bottom:
      "text-white mix-blend-lighten opacity-10 transition-all duration-300",
  },
};

export const textVariants = cva("", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      tertiary: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";

    return (
      <div className="relative">
        <Comp
          className={cn(
            "absolute inset-0 z-[-1]",
            textVariants({ variant, className }),
            textStyles[variant ?? "default"].bottom,
          )}
          ref={ref}
          {...props}
        />
        <Comp
          className={cn(
            textVariants({ variant, className }),
            textStyles[variant ?? "default"].top,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

export { Text };
