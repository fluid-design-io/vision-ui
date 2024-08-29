import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors disabled:pointer-events-none disabled:opacity-50 *:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "[text-shadow:_0_0_2px_rgba(0,0,0,0.5)]",
    "[&>.btn-bg]:bg-white/0 [&>.btn-bg]:[filter:blur(0.25px)]",
    "[&_[data-slot='icon']]:stroke-[2.25px]",
  ),
  {
    variants: {
      variant: {
        default:
          "[&>.btn-bg]:bg-white/10 [&>.btn-bg]:hover:bg-white/20 text-foreground/90 [&_[data-slot='icon']]:text-foreground/70 p-2",
        destructive:
          "[&>.btn-bg]:bg-destructive text-destructive-foreground/90",
        outline:
          "border border-input [&>.btn-bg]:bg-white/10 hover:text-accent-foreground/90",
        secondary:
          "[&>.btn-bg]:bg-foreground/90 text-background/90 [&_[data-slot='icon']]:text-background/85",
        ghost:
          "[&>.btn-bg]:hover:bg-white/20 [&_[data-slot='icon']]:text-foreground/85",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 p-[10px]",
        icon: "h-11 w-11",
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
      <div
        className={cn(
          "flex min-h-[60px] min-w-[60px] items-center justify-center p-2",
          roundedClasses,
        )}
      >
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
      </div>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
