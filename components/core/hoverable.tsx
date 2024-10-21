import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import View, { ViewProps } from "./view";
import React from "react";

interface HoverableProps extends ViewProps {
  asChild?: boolean;
  enabled?: boolean;
}

const Hoverable = React.forwardRef<HTMLDivElement, HoverableProps>(
  ({ className, asChild = false, enabled = true, ...props }, ref) => {
    const Comp = asChild ? Slot : View;
    return (
      <Comp
        className={cn({ "vision-pro-ui-hoverable": enabled }, className)}
        {...props}
      />
    );
  },
);
Hoverable.displayName = "Hoverable";

export { Hoverable };

export type { HoverableProps };
