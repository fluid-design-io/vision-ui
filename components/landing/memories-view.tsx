"use client";

import { NavigationBar } from "../core/navigation-bar";
import { ButtonGroup } from "../ui/button";
import { HeroDropdownMenu } from "./hero-dropdown-menu";
import Image from "next/image";

import { Text } from "../ui/typography";
import { TextEffect } from "../core/text-effects";

import forest from "@/public/assets/demo/forest.avif";
import { AspectRatio } from "../ui/aspect-ratio";

// const memories = [
//   {
//     alt: "Photo by Paul Earle on Unsplash",
//     link: "https://unsplash.com/photos/mountain-dew-during-sunrise-xJ2tjuUHD9M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
//     src: mountains,
//   },
//   {
//     alt: "Photo by Jp Valery on Unsplash",
//     link: "https://unsplash.com/photos/brown-wooden-house-surrounded-by-trees-OBpOP9GVH9U?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
//     src: mercantour,
//   },
//   {
//     alt: "Photo by Paul Pastourmatzis on Unsplash",
//     link: "https://unsplash.com/photos/silhouette-of-trees-covered-by-fog-KT3WlrL_bsg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
//     src: forest2,
//   },
//   {
//     alt: "Photo by Sylwia Bartyzel on Unsplash",
//     link: "https://unsplash.com/photos/mountain-covered-with-clouds-tME8s001BNQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
//     src: mountains2,
//   },
// ];

export const MemoriesView = () => {
  return (
    <>
      <NavigationBar>
        <div />
        <ButtonGroup>
          <HeroDropdownMenu />
        </ButtonGroup>
      </NavigationBar>
      <div className="relative">
        <div className="absolute inset-0 mx-auto flex items-center justify-center">
          <Text
            variant="default"
            size="XLTitle1"
            className="[text-shadow:0_0_10px_hsl(var(--background)/0.1)]"
            asChild
          >
            <TextEffect
              preset="blur"
              per="char"
              as="h1"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delay: 0.5,
                    },
                  },
                },
              }}
            >
              VisionOS UI
            </TextEffect>
          </Text>
        </div>
        <Image
          src={forest}
          alt={
            "A small boat of fisherman in Fuvahmulah, Maldives heading out for the days work."
          }
          className="h-[25vw] w-full object-cover"
        />
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        {Array.from({ length: 12 }).map((_, index) => (
          <AspectRatio ratio={1 / 1}>
            <div className="h-full w-full bg-gray-300/10" />
          </AspectRatio>
        ))}
      </div>
    </>
  );
};
