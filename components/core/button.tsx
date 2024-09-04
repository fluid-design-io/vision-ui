import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    //* base *//
    "relative flex min-h-[44px] min-w-[44px] items-center justify-center",
    "text-[17px] leading-[22px] font-medium",
    "rounded-md ring-offset-white *:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "[font-feature-settings:'liga'_off,_'clig'_off]",
    //* icon *//
    "[&_[data-slot='icon']]:stroke-[2.25px]",
    "[&_[data-slot='icon']]:transition-opacity [&_[data-slot='icon']]:duration-300",
    "[&_[data-slot='icon']]:disabled:text-[color-mix(in_sRGB,white_10%,#5E5E5E_45%)]",
    //* disabled *//
    "disabled:pointer-events-none disabled:text-[color-mix(in_sRGB,white_10%,#5E5E5E_45%)]",
    //* before *//
    "before:[filter:blur(0.25px)] before:absolute before:inset-0 before:z-0 before:rounded-md",
    "before:disabled:[linear-gradient(0deg,rgba(94,94,94,0.07)_0%,rgba(94,94,94,0.07)_100%),rgba(255,255,255,0.04)]",
    "before:[transform:translateX(var(--btn-bg-translate-x))_translateY(var(--btn-bg-translate-y))]",
    "before:[background-blend-mode:color-dodge,lighten] before:transition-opacity before:duration-300",
    "before:[background:linear-gradient(0deg,rgba(94,94,94,0.24)_0%,rgba(94,94,94,0.24)_100%),rgba(255,255,255,0.12)]",
    "before:opacity-0",
  ),
  {
    variants: {
      /**
       * @default "default"
       */
      variant: {
        default: cn(
          "text-foreground/90",
          //* icon *//
          "[&_[data-slot='icon']]:text-foreground",
          "[&_[data-slot='icon']]:opacity-[0.96]",
          //* before *//
          "before:opacity-75 before:hover:opacity-[0.96]",
        ),
        secondary: cn(
          "text-foreground/50 hover:text-foreground/90 transition-colors",
          //* icon *//
          "[&_[data-slot='icon']]:text-foreground",
          "[&_[data-slot='icon']]:opacity-60",
          "[&_[data-slot='icon']]:hover:opacity-[0.96]",
          //* before *//
          "before:hover:opacity-50 before:opacity-0",
          "before:hover:[background:linear-gradient(0deg,rgba(94,94,94,0.24)_0%,rgba(94,94,94,0.24)_100%),rgba(255,255,255,0.12)]",
        ),
        /* bg-destructive text-destructive-foreground */
        destructive: cn(
          "before:bg-destructive text-destructive-foreground/90",
          //* icon *//
          "[&_[data-slot='icon']]:text-destructive",
          "[&_[data-slot='icon']]:opacity-70",
          "[&_[data-slot='icon']]:hover:opacity-[0.96]",
          //* before *//
          "before:hover:opacity-50 before:opacity-0",
          "before:hover:[background:linear-gradient(0deg,rgba(94,94,94,0.24)_0%,rgba(94,94,94,0.24)_100%),rgba(255,255,255,0.12)]",
        ),
        selected: cn(
          "text-background/[0.96]",
          //* icon *//
          "[&_[data-slot='icon']]:text-background [&_[data-slot='icon']]:z-[1]",
          "before:[background:hsla(var(--foreground)/0.96)] before:text-background/90",
          "before:hover:opacity-100 before:opacity-100",
        ),
        link: cn(
          "text-[#5ac8f5]",
          //* icon *//
          "[&_[data-slot='icon']]:text-[#5ac8f5]",
          "[&_[data-slot='icon']]:opacity-70",
          "[&_[data-slot='icon']]:hover:opacity-[0.96]",
          //* before *//
          "before:hover:opacity-50 before:opacity-0",
          "before:hover:[background:linear-gradient(0deg,rgba(94,94,94,0.24)_0%,rgba(94,94,94,0.24)_100%),rgba(255,255,255,0.12)]",
        ),
      },
      /**
       * @default "default"
       */
      size: {
        default: "h-[2.75rem] px-[20px]",
        list: "h-[60px] px-[20px]",
        icon: "h-[2.75rem] w-[2.75rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariant = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariant {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }: ButtonGroupProps, ref) => {
    return (
      <div
        className={cn("flex items-center justify-center gap-2 p-3", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";

export { Button, buttonVariants, ButtonGroup };
export type { ButtonVariant, ButtonProps };
