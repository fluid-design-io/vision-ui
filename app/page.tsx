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

import Window from "@/components/core/window";
import { Ornament, OrnamentItem } from "@/components/core/ornament";
import { SVGProps } from "react";

export default function HomePage() {
  return (
    <>
      <Cursor />
      <main
        className="flex min-h-screen flex-col justify-center space-y-8 text-center"
        data-vision-pro-ui
      >
        <h1 className="text-2xl font-bold">VisionOS UI</h1>
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
          <Button className="rounded-full" size="icon">
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
        <div className="flex items-center justify-center">
          <div className="flex min-w-[20rem] items-center justify-center rounded-md bg-gradient-to-tr from-rose-700/40 via-indigo-700/40 to-cyan-700/40 p-8">
            <Ornament>
              <OrnamentItem
                icon={<IconHistory data-slot="icon" />}
                label="Memories"
              />
              <OrnamentItem
                icon={<IconPhotoFilled data-slot="icon" />}
                label="Library"
              />
              <OrnamentItem
                icon={<IconPanoramaHorizontalFilled data-slot="icon" />}
                label="Panorama"
              />
              <OrnamentItem
                icon={<StackIcon className="size-6" data-slot="icon" />}
                label="Albums"
              />
              <OrnamentItem
                icon={<IconSearch data-slot="icon" />}
                label="Search"
              />
            </Ornament>
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
