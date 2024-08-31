// recessed, thin, regular(default), thick

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const viewVariants = cva("", {
  variants: {
    variant: {
      recessed: cn(
        "bg-[linear-gradient(0deg,rgba(208,208,208,0.5)_0%,rgba(208,208,208,0.5)_100%),rgba(0,0,0,0.1)]",
        "bg-blend-color-burn bg-blend-luminosity",
        "shadow-[0px_-0.5px_1px_rgba(255,255,255,0.3),0px_-0.5px_1px_rgba(255,255,255,0.25),0px_1.5px_4px_rgba(0,0,0,0.08),0px_1.5px_4px_rgba(0,0,0,0.1)]",
      ),
      thin: cn(
        "bg-[linear-gradient(0deg,rgba(94,94,94,0.13)_0%,rgba(94,94,94,0.13)_100%),rgba(255,255,255,0.07)]",
        "bg-blend-color-dodge bg-blend-lighten",
      ),
      regular: cn(
        "bg-[linear-gradient(0deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.08)_100%),rgba(214,214,214,0.45)]",
        "bg-blend-luminosity bg-blend-color-burn",
      ),
      thick: cn(
        "bg-[linear-gradient(0deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_100%),rgba(218,218,218,0.92)]",
        "bg-blend-luminosity bg-blend-color-burn",
      ),
    },
  },
  defaultVariants: {
    variant: "regular",
  },
});

export interface ViewProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof viewVariants> {
  asChild?: boolean;
}

const View = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ className, variant, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(viewVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
View.displayName = "View";

export default View;
