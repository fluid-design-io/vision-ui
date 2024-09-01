import { Cursor } from "@/components/core/cursor";
import { Button, ButtonGroup } from "@/components/ui/button";
import {
  Ellipsis,
  PenBox,
  Share,
  Undo2,
  Redo2,
  ALargeSmall,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";

import { Window } from "@/components/core/window";
import { SVGProps } from "react";

import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = dynamic(
  () => import("../components/landing/hero").then((mod) => mod.Hero),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="rounded-[--tile-radius]">
        <AspectRatio ratio={2610 / 1468} />
      </Skeleton>
    ),
  },
);

export default function HomePage() {
  return (
    <>
      <Cursor />
      <main className="flex max-w-none flex-col justify-center gap-8 pb-24 text-center [--tile-radius:1.875rem]">
        <Hero />

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

        <div className="flex items-center justify-center">
          <div
            className="flex min-w-[20rem] items-center justify-center rounded-[--tile-radius] border p-8"
            data-vision-os-ui
          >
            <ButtonGroup>
              <Button>Action</Button>
              <Button disabled>Action</Button>
              <Button variant="secondary">Action</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="flex min-w-[20rem] items-center justify-center rounded-[--tile-radius] border p-8"
            data-vision-os-ui
          >
            <Window thickness="thinner">
              <ButtonGroup>
                <Button variant="selected" className="rounded-full" size="icon">
                  <Share data-slot="icon" />
                </Button>
                <Button className="rounded-full" size="icon">
                  <Ellipsis data-slot="icon" />
                </Button>
                <Button className="rounded-full" size="icon" disabled>
                  <PenBox data-slot="icon" />
                </Button>
              </ButtonGroup>
            </Window>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="flex min-w-[20rem] items-center justify-center rounded-[--tile-radius] bg-gradient-to-tr from-rose-700/40 via-indigo-700/40 to-cyan-700/40 p-8"
            data-vision-os-ui
          >
            <Window>
              <ButtonGroup>
                <Button
                  variant="secondary"
                  className="rounded-full"
                  size="icon"
                >
                  <Undo2 data-slot="icon" />
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full"
                  size="icon"
                >
                  <Redo2 data-slot="icon" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button
                  variant="secondary"
                  className="rounded-full"
                  size="icon"
                >
                  <ALargeSmall data-slot="icon" />
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full"
                  size="icon"
                >
                  <ListOrdered data-slot="icon" />
                </Button>
              </ButtonGroup>
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
