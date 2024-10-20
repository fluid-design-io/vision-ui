import { NavigationBar, NavigationBarTitle } from "../core/navigation-bar";
import { Button, ButtonGroup } from "../core/button";
import { HeroDropdownMenu } from "./hero-dropdown-menu";
import Image from "next/image";
import acmeSky from "@/public/assets/acme-sky.jpg";
import { Text } from "../ui/typography";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Hoverable } from "../core/hoverable";

export const AppStoreView = () => {
  return (
    <>
      <div className="relative isolate mb-4 flex-1">
        <Image
          src={acmeSky}
          alt="Acme Sky"
          className={cn(
            "absolute inset-0 z-[-2] h-[550px] w-full flex-shrink-0 object-cover",
            "[mask-image:linear-gradient(to_top,transparent,black_150px)]",
          )}
        />
        <NavigationBar>
          <NavigationBarTitle variant="leading">
            Apps & Games
          </NavigationBarTitle>
          <ButtonGroup>
            <HeroDropdownMenu />
          </ButtonGroup>
        </NavigationBar>
        <div className="mt-32 flex max-w-md flex-col items-start gap-2 px-12">
          <Text size="subheadline" className="uppercase">
            Editor's Choice
          </Text>
          <Text size="XLTitle2" className="text-start leading-tight">
            Explore the <br /> Cosmos
          </Text>
          <Text size="body" className="text-start" variant="secondary">
            Immerse yourself in the wonders of the cosmos with these apps and
            games.
          </Text>
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-black/30 p-4 backdrop-blur backdrop-saturate-150">
            <div>
              <div className="size-16 rounded-full bg-white/20" />
            </div>
            <div className="flex min-w-[200px] flex-col gap-1">
              <Text size="title3" className="text-start">
                Acme Sky
              </Text>
              <Text size="caption1" className="text-start" variant="secondary">
                A beautiful skyscape, travel through the cosmos
              </Text>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="default" className="w-[86px]">
                Get
              </Button>
              <Text className="text-center text-[10px]" variant="tertiary">
                In App Purchases
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[1] mt-4 flex flex-col gap-2 px-6">
        <div className="flex items-center justify-start gap-2">
          <Text size="title3">Get Started</Text>
          <ChevronRight className="size-4 text-foreground/80" />
        </div>

        <div className="relative z-[1] grid grid-cols-3 gap-4">
          <Hoverable className="h-[150px] w-full rounded-xl bg-gray-300/10" />
          <Hoverable className="h-[150px] w-full rounded-xl bg-gray-300/10" />
          <Hoverable className="h-[150px] w-full rounded-xl bg-gray-300/10" />
          <Hoverable className="h-[150px] w-full rounded-xl bg-gray-300/10" />
          <Hoverable className="h-[150px] w-full rounded-xl bg-gray-300/10" />
          <Hoverable className="h-[150px] w-full rounded-xl bg-gray-300/10" />
        </div>
      </div>
    </>
  );
};
