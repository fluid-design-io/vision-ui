import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors *:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "[&>.btn-bg]:[filter:blur(0.25px)]",
    "[&_[data-slot='icon']]:stroke-[2.25px]",
    "[font-feature-settings:'liga'_off,_'clig'_off]",
    "disabled:pointer-events-none disabled:text-[color-mix(in_sRGB,white_10%,#5E5E5E_45%)] [&_[data-slot='icon']]:disabled:text-[color-mix(in_sRGB,white_10%,#5E5E5E_45%)] [&>.btn-bg]:disabled:[background:linear-gradient(0deg,rgba(94,94,94,0.07)_0%,rgba(94,94,94,0.07)_100%),rgba(255,255,255,0.04)]",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "text-foreground/90 [&_[data-slot='icon']]:text-foreground/70 p-2",
          "[&>.btn-bg]:[background:linear-gradient(0deg,rgba(94,94,94,0.18)_0%,rgba(94,94,94,0.18)_100%),rgba(255,255,255,0.06)]",
          "[&>.btn-bg]:hover:[background:linear-gradient(0deg,rgba(94,94,94,0.24)_0%,rgba(94,94,94,0.24)_100%),rgba(255,255,255,0.12)]",
          "[&>.btn-bg]:[background-blend-mode:color-dodge,lighten]",
        ),
        destructive:
          "[&>.btn-bg]:bg-destructive text-destructive-foreground/90",
        outline:
          "border border-input [&>.btn-bg]:bg-white/10 hover:text-accent-foreground/90",
        secondary: cn(
          "[&_[data-slot='icon']]:text-foreground/85",
          "[&>.btn-bg]:hover:[background:linear-gradient(0deg,rgba(94,94,94,0.18)_0%,rgba(94,94,94,0.18)_100%),rgba(255,255,255,0.06)]",
        ),
        selected:
          "[&>.btn-bg]:bg-foreground/95 text-background/90 [&_[data-slot='icon']]:text-background",
        ghost: cn(
          "[&_[data-slot='icon']]:text-foreground/85",
          "[&>.btn-bg]:hover:[background:linear-gradient(0deg,rgba(94,94,94,0.18)_0%,rgba(94,94,94,0.18)_100%),rgba(255,255,255,0.06)]",
        ),
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[2.75rem] p-[10px]",
        icon: "h-[2.75rem] w-[2.75rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // get rounded-* classes
    const roundedClasses = className?.match(/rounded-\S+/g);
    return (
      <Comp
        className={cn(
          "relative isolate flex min-h-[44px] min-w-[44px] items-center justify-center",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
      >
        <>
          {children}
          <div
            className={cn(
              "btn-bg absolute inset-0 z-[-1] rounded-md transition-colors duration-300",
              roundedClasses,
            )}
          />
        </>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
