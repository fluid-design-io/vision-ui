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

export const Hero = () => {
  return (
    <HeroLayout>
      <AspectRatio
        ratio={2610 / 1468}
        className="relative mx-auto flex max-h-[1468px] max-w-[2610px] items-center justify-center"
        data-vision-os-ui
      >
        <Ornament defaultTab="memories">
          <div className="mb-[18.5px]">
            <OrnamentTabs>
              <OrnamentTrigger
                icon={<IconHistory data-slot="icon" />}
                label="Memories"
                value="memories"
              />
              <OrnamentTrigger
                icon={<IconPhotoFilled data-slot="icon" />}
                label="Library"
                value="library"
              />
              <OrnamentTrigger
                icon={<IconPanoramaHorizontalFilled data-slot="icon" />}
                label="Panorama"
                value="panorama"
              />
            </OrnamentTabs>
          </div>
          <div className="grid h-[max(520px,50%)] max-h-[max(520px,50%)] w-full grid-rows-[1fr_37px] place-items-center 2xl:h-[max(640px,50%)] 2xl:max-h-[max(640px,50%)]">
            <OrnamentContents>
              <OrnamentContent value="memories" key="memories">
                <NavigationBar>
                  <div />
                  <NavigationBarTitle>Title</NavigationBarTitle>
                  <ButtonGroup>
                    <HeroDropdownMenu />
                  </ButtonGroup>
                </NavigationBar>
              </OrnamentContent>
              <OrnamentContent value="library" key="library">
                <div className="flex h-[92px] items-center justify-center">
                  <Text variant="default" asChild>
                    <h1 className="text-xl font-semibold">VisionOS UI</h1>
                  </Text>
                </div>
                <div className="px-6 pt-5">
                  <Text variant="secondary">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti perferendis eaque, fugiat dolore voluptatum quas
                    eveniet maiores dolorem voluptates itaque soluta repudiandae
                    culpa velit optio consequuntur, quisquam similique tempore
                    cupiditate.
                  </Text>
                  <Text variant="tertiary">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti perferendis eaque, fugiat dolore voluptatum quas
                    eveniet maiores dolorem voluptates itaque soluta repudiandae
                    culpa velit optio consequuntur, quisquam similique tempore
                    cupiditate.
                  </Text>
                </div>
              </OrnamentContent>
              <OrnamentContent value="panorama" key="panorama">
                <div className="flex h-[92px] items-center justify-center">
                  <Text variant="default" asChild>
                    <h1 className="text-xl font-semibold">VisionOS UI 3</h1>
                  </Text>
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
