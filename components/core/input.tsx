import * as React from "react";

import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Whether to show the dictation button
   * @default true
   */
  dictation?: boolean;
  shape?: "rounded" | "pill";
}

/* 
background-blend-mode: luminosity, color-burn;
box-shadow: 0px -0.5px 1px 0px rgba(255, 255, 255, 0.30) inset, 0px -0.5px 1px 0px rgba(255, 255, 255, 0.25) inset, 1px 1.5px 4px 0px rgba(0, 0, 0, 0.08) inset, 1px 1.5px 4px 0px rgba(0, 0, 0, 0.10) inset;

  
  */

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, dictation = true, shape = "pill", type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative h-11 w-full items-center justify-start gap-2 bg-black/15",
          "disabled:bg-black/5 disabled:[background:linear-gradient(0deg,_rgba(0,_0,_0,_0.08)_0%,_rgba(0,_0,_0,_0.08)_100%),_rgba(214,_214,_214,_0.45)]",
          "[background-blend-mode:luminosity,color-burn]",
          "[box-shadow:0px_-0.5px_1px_0px_rgba(255,255,255,0.30)_inset,_0px_-0.5px_1px_0px_rgba(255,255,255,0.25)_inset,_1px_1.5px_4px_0px_rgba(0,0,0,0.12)_inset,_1px_1.5px_4px_0px_rgba(0,0,0,0.10)_inset]",
          {
            "rounded-[100px]": shape === "rounded",
            "rounded-full": shape === "pill",
          },
        )}
      >
        {dictation && (
          <div className="absolute inset-y-0 left-3 flex w-7 flex-col items-center justify-center">
            <Mic className="size-5 shrink grow basis-0 self-stretch text-center leading-snug text-muted-foreground/60" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            {
              "pl-10": dictation,
              "pl-4": !dictation,
            },
            "vision-pro-ui-hoverable",
            "caret-foreground/80",
            "flex h-11 w-full rounded-[100px] bg-transparent py-2 pr-4 text-sm font-medium",
            "placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
