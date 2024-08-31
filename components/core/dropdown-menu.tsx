"use client";

import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuContent as DropdownMenuContentPrimitive,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger as DropdownMenuTriggerPrimitive,
} from "@/components/ui/dropdown-menu";

import * as RadixDropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  DropdownMenuContentProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import { Window } from "./window";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { textVariants } from "../ui/typography";

const DropdownMenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
  isMouseDown: false,
  setIsMouseDown: () => {},
});

export function useDropdownMenu() {
  return useContext(DropdownMenuContext);
}

const DropdownMenuTrigger = ({
  children,
  ...props
}: DropdownMenuTriggerProps) => {
  return (
    <DropdownMenuTriggerPrimitive {...props}>
      {children}
    </DropdownMenuTriggerPrimitive>
  );
};

const DropdownMenu = ({ children, ...props }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    // add data-vision-os-ui to html
    if (isOpen) {
      document.documentElement.setAttribute("data-vision-os-ui", "true");
    } else {
      setTimeout(() => {
        document.documentElement.removeAttribute("data-vision-os-ui");
      }, 800);
    }
  }, [isOpen]);
  return (
    <DropdownMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isMouseDown,
        setIsMouseDown,
      }}
    >
      <DropdownMenuPrimitive open={isOpen} onOpenChange={setIsOpen} {...props}>
        {children}
      </DropdownMenuPrimitive>
    </DropdownMenuContext.Provider>
  );
};

DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuContent = ({
  children,
  ...props
}: Omit<DropdownMenuContentProps, "asChild" | "forceMount">) => {
  const { isOpen, isMouseDown } = useDropdownMenu();
  return (
    <AnimatePresence>
      {isOpen && (
        <DropdownMenuContentPrimitive forceMount asChild {...props}>
          <Window
            key="dropdown-menu-content"
            className="flex min-w-[200px] flex-col gap-2 p-4"
            initial={{
              opacity: 0,
              scale: 0.65,
              y: -30,
            }}
            animate={{
              opacity: 1,
              scale: isMouseDown ? 0.95 : 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.65,
              y: -30,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 22,
            }}
          >
            {children}
          </Window>
        </DropdownMenuContentPrimitive>
      )}
    </AnimatePresence>
  );
};

DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "secondary" | "destructive";
  }
>(
  (
    {
      inset,
      className,
      children,
      variant,
      onMouseDown,
      onMouseUp,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { setIsMouseDown, setIsOpen } = useDropdownMenu();
    return (
      <RadixDropdownMenuPrimitive.Item
        ref={ref}
        onMouseDown={(e) => {
          setIsMouseDown(true);
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          setIsMouseDown(false);
          onMouseUp?.(e);
        }}
        onClick={(e) => {
          e.preventDefault();
          onClick?.(e);
          setTimeout(() => {
            setIsOpen(false);
          }, 300);
        }}
        {...props}
        asChild
      >
        <Button
          variant={variant ?? "secondary"}
          size="list"
          className={cn(
            //TODO: hover causing focus-visiable to trigger
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "w-full justify-start rounded-[16px] before:rounded-[16px]",
            "flex justify-between gap-2",
            "[&_[data-slot='icon']]:ml-2",
            textVariants({ size: "body" }),
            inset && "pl-8",
            className,
          )}
        >
          {children}
        </Button>
      </RadixDropdownMenuPrimitive.Item>
    );
  },
);

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
