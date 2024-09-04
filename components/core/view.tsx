// recessed, thin, regular(default), thick

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const viewVariants = cva("", {
  variants: {
    variant: {
      recessed: cn(
        "[background:linear-gradient(0deg,rgba(208,208,208,0.5)_0%,rgba(208,208,208,0.5)_100%),rgba(0,0,0,0.1)]",
        "[background-blend-mode:color-burn,luminosity]",
        "shadow-[0px_-0.5px_1px_rgba(255,255,255,0.3),0px_-0.5px_1px_rgba(255,255,255,0.25),0px_1.5px_4px_rgba(0,0,0,0.08),0px_1.5px_4px_rgba(0,0,0,0.1)]",
      ),
      thin: cn(
        // "[background:linear-gradient(0deg,rgba(94,94,94,0.13)_0%,rgba(94,94,94,0.13)_100%),rgba(255,255,255,0.07)]",
        // "[background-blend-mode:color-dodge,lighten]",
        "bg-neutral-50/10",
        "[background-blend-mode:lighten]",
      ),
      regular: cn(
        // "[background:linear-gradient(0deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.08)_100%),rgba(214,214,214,0.45)]",
        // "[background-blend-mode:luminosity,color-burn]",
        "bg-neutral-950/20",
        "[background-blend-mode:color-dodge]",
      ),
      thick: cn(
        //TODO: Webkit renders differently than Chrome... need to write 2 styles, one for each browser
        // "[background:linear-gradient(0deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_100%),rgba(218,218,218,0.92)]",
        // "[backdrop-filter:brightness(0.65)_saturate(1.5)]",
        // "backdrop-brightness-[0.65] backdrop-saturate-[1.5]",
        // "[background-blend-mode:luminosity,color-burn]",
        "bg-neutral-950/30",
        "[background-blend-mode:color-dodge]",
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
