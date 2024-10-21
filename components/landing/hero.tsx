import { IconPhotoFilled } from "@tabler/icons-react";

import { WindowControls } from "@/components/core/window";
import {
  OrnamentTabs,
  OrnamentContent,
  OrnamentTab,
  Ornament,
  OrnamentContents,
} from "@/components/core/ornament";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { HeroBackground } from "./hero-background";
import { HeroLayout } from "./hero-layout";
import { cn } from "@/lib/utils";

import { MemoriesToolbar, MemoriesView } from "./memories-view";
import { LibraryView } from "./app-store.client";
import { SVGProps } from "react";
import { PencilRulerIcon, Settings } from "lucide-react";
import SettingsView from "./settings.server";

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
              <OrnamentTab
                icon={<IconPhotoFilled data-slot="icon" />}
                label="Memories"
                value="memories"
              />
              <OrnamentTab
                icon={<PencilRulerIcon className="size-6" data-slot="icon" />}
                label="App Store"
                value="app-store"
              />
              <OrnamentTab
                icon={<Settings data-slot="icon" />}
                label="Settings"
                value="settings"
              />
            </OrnamentTabs>
          </div>
          <div className="grid w-full grid-rows-[1fr_37px] place-items-center">
            <OrnamentContents contentClassName={cn("h-[32vw] max-h-[640px]")}>
              <OrnamentContent
                value="memories"
                key="memories"
                FooterComponent={MemoriesToolbar}
              >
                <MemoriesView />
              </OrnamentContent>
              <OrnamentContent value="app-store" key="app-store">
                <LibraryView />
              </OrnamentContent>
              <OrnamentContent value="settings" key="settings">
                <SettingsView />
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

const StackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
  </svg>
);
