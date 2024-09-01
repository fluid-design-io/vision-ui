import {
  IconHistory,
  IconPanoramaHorizontalFilled,
  IconPhotoFilled,
} from "@tabler/icons-react";

import { WindowControls } from "@/components/core/window";
import {
  OrnamentTabs,
  OrnamentContent,
  OrnamentTrigger,
  Ornament,
  OrnamentContents,
} from "@/components/core/ornament";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Text } from "@/components/ui/typography";
import { HeroBackground } from "./hero-background";
import { HeroLayout } from "./hero-layout";
import {
  NavigationBar,
  NavigationBarTitle,
} from "@/components/core/navigation-bar";
import { ButtonGroup } from "@/components/ui/button";
import { HeroDropdownMenu } from "./hero-dropdown-menu";
import { cn } from "@/lib/utils";

import { MemoriesView } from "./memories-view";

export const Hero = () => {
  return (
    <HeroLayout>
      <AspectRatio
        ratio={2610 / 1468}
        className="relative isolate mx-auto flex max-h-[1468px] max-w-[2610px] items-center justify-center"
        data-vision-os-ui
      >
        <Ornament defaultTab="memories">
          <div className="mb-[18.5px]">
            <OrnamentTabs>
              <OrnamentTrigger
                icon={<IconPhotoFilled data-slot="icon" />}
                label="Memories"
                value="memories"
              />
              <OrnamentTrigger
                icon={<IconPanoramaHorizontalFilled data-slot="icon" />}
                label="Library"
                value="library"
              />
              <OrnamentTrigger
                icon={<IconHistory data-slot="icon" />}
                label="Changelog"
                value="changelog"
              />
            </OrnamentTabs>
          </div>
          <div
            className={cn(
              "grid w-full grid-rows-[1fr_37px] place-items-center",
            )}
          >
            <OrnamentContents contentClassName={cn("h-[32vw] max-h-[640px]")}>
              <OrnamentContent value="memories" key="memories">
                <MemoriesView />
              </OrnamentContent>
              <OrnamentContent value="library" key="library">
                <NavigationBar>
                  <div />
                  <NavigationBarTitle>Library</NavigationBarTitle>
                  <ButtonGroup>
                    <HeroDropdownMenu />
                  </ButtonGroup>
                </NavigationBar>
              </OrnamentContent>
              <OrnamentContent value="changelog" key="changelog">
                <NavigationBar>
                  <div />
                  <NavigationBarTitle>Changelog</NavigationBarTitle>
                  <ButtonGroup>
                    <HeroDropdownMenu />
                  </ButtonGroup>
                </NavigationBar>
                <div className="px-6 pt-32">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <Text size="title3">0.1.0</Text>
                      <Text variant="tertiary" size="callout">
                        2024/09/01
                      </Text>
                    </div>
                    <Text variant="secondary" className="text-left">
                      Initial release
                    </Text>
                  </div>
                </div>
              </OrnamentContent>
            </OrnamentContents>
            <WindowControls />
          </div>
        </Ornament>
        <HeroBackground />
      </AspectRatio>
    </HeroLayout>
  );
};
