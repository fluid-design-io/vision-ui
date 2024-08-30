import { Cursor } from "@/components/core/cursor";
import { Button } from "@/components/ui/button";
import { Ellipsis, PenBox, PlusIcon, Share } from "lucide-react";
import {
  IconHistory,
  IconMapPinFilled,
  IconPanoramaHorizontalFilled,
  IconPhotoFilled,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";

import { Window, WindowControls } from "@/components/core/window";
import {
  OrnamentTabs,
  OrnamentContent,
  OrnamentTrigger,
  Ornament,
  OrnamentContents,
} from "@/components/core/ornament";
import { SVGProps } from "react";

import bg from "@/public/assets/background-night.png";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Text } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <>
      <Cursor />
      <main className="flex min-h-screen max-w-none flex-col justify-center space-y-8 text-center">
        <AspectRatio
          ratio={2610 / 1468}
          className="isolate flex max-h-[1468px] max-w-[2610px] items-center justify-center"
          data-vision-os-ui
        >
          <Ornament defaultTab="memories">
            <div className="mb-[18.5px]">
              <OrnamentTabs>
                <OrnamentTrigger
                  icon={<IconHistory />}
                  label="Memories"
                  value="memories"
                />
                <OrnamentTrigger
                  icon={<IconPhotoFilled />}
                  label="Library"
                  value="library"
                />
                <OrnamentTrigger
                  icon={<IconPanoramaHorizontalFilled />}
                  label="Panorama"
                  value="panorama"
                />
                {/* <OrnamentItem
                  icon={<StackIcon className="size-6" />}
                  label="Albums"
                  value="albums"
                />
                <OrnamentItem
                  icon={<IconSearch />}
                  label="Search"
                  value="search"
                /> */}
              </OrnamentTabs>
            </div>
            <div className="grid h-[max(520px,50%)] max-h-[max(520px,50%)] w-full grid-rows-[1fr_37px] place-items-center">
              <OrnamentContents>
                <OrnamentContent value="memories" key="memories">
                  <div className="flex h-[92px] items-center justify-center">
                    <Text variant="default" asChild>
                      <h1 className="text-xl font-semibold">VisionOS UI</h1>
                    </Text>
                  </div>
                </OrnamentContent>
                <OrnamentContent value="library" key="library">
                  <div className="flex h-[92px] items-center justify-center">
                    <Text variant="default" asChild>
                      <h1 className="text-xl font-semibold">VisionOS UI 2</h1>
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
          <Image
            src={bg}
            alt="background"
            unoptimized
            className="absolute inset-0 z-[-1] rounded-3xl p-1.5"
          />
        </AspectRatio>

        <p className="text-fd-muted-foreground">
          You can open{" "}
          <Link
            href="/docs"
            className="font-semibold text-fd-foreground underline"
          >
            /docs
          </Link>{" "}
          and see the documentation.
        </p>
        <div className="mx-auto flex items-center justify-center">
          <Button>Click me</Button>
          <Button>A</Button>
          <Button>Another Button</Button>
          <Button size="icon">
            <PlusIcon className="pointer-events-none" />
          </Button>
        </div>
        <Window
          className="mx-auto flex items-center justify-center"
          thickness="thinner"
        >
          <Button variant="secondary" className="rounded-full" size="icon">
            <Share data-slot="icon" />
          </Button>
          <Button className="rounded-full" size="icon">
            <Ellipsis data-slot="icon" />
          </Button>
          <Button className="rounded-full" size="icon" disabled>
            <PenBox data-slot="icon" />
          </Button>
        </Window>
        <div className="flex items-center justify-center">
          <div className="flex min-w-[20rem] items-center justify-center rounded-md bg-gradient-to-tr from-rose-700/40 via-indigo-700/40 to-cyan-700/40 p-8">
            <Window
              className="mx-auto flex items-center justify-center"
              thickness="normal"
            >
              <Button variant="ghost" className="rounded-full" size="icon">
                <IconPhotoFilled data-slot="icon" />
              </Button>
              <Button variant="ghost" className="rounded-full" size="icon">
                <IconMapPinFilled data-slot="icon" />
              </Button>
              <Button variant="ghost" className="rounded-full" size="icon">
                <IconPanoramaHorizontalFilled data-slot="icon" />
              </Button>
              <Button variant="ghost" className="rounded-full" size="icon">
                <IconSearch data-slot="icon" />
              </Button>
            </Window>
          </div>
        </div>
      </main>
    </>
  );
}

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
