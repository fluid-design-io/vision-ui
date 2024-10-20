import { cn } from "@/lib/utils";
import React from "react";

interface HoverableProps extends React.HTMLAttributes<HTMLDivElement> {}

function Hoverable({ className, ...props }: HoverableProps) {
  return (
    <div className={cn("vision-pro-ui-hoverable", className)} {...props} />
  );
}

export { Hoverable };

export type { HoverableProps };
