"use client";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/dropdown-menu";
import { IconBrandGithub, IconBrightnessFilled } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { isDayAtom } from "./hero-background";
import { cn } from "@/lib/utils";

export const HeroDropdownMenu = () => {
  const [isDay, setIsDay] = useAtom(isDayAtom);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="backdrop-blur-xl" size="icon">
        <Ellipsis data-slot="icon" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setIsDay(!isDay)}>
          Toggle Background
          <IconBrightnessFilled
            data-slot="icon"
            className={cn(
              "!transition-all duration-300",
              isDay ? "rotate-0" : "rotate-180",
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Github
          <IconBrandGithub data-slot="icon" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
