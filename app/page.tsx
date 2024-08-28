import { Cursor } from "@/components/core/cursor";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusIcon, Trash2, X } from "lucide-react";
import {
  IconMapPinFilled,
  IconPanoramaHorizontalFilled,
  IconPhotoFilled,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";

import "@/app/vision-pro-ui.css";

export default function HomePage() {
  return (
    <>
      <Cursor />
      <main
        className="flex min-h-screen flex-col justify-center space-y-8 text-center"
        data-vision-pro-ui
      >
        <h1 className="text-2xl font-bold">Hello World</h1>
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
        <div className="mx-auto flex items-center justify-center">
          <Button variant="ghost" className="rounded-full" size="icon">
            <PlusIcon />
          </Button>
          <Button variant="ghost" className="rounded-full" size="icon">
            <BookOpen />
          </Button>
          <Button variant="ghost" className="rounded-full" size="icon">
            <X />
          </Button>
          <Button variant="ghost" className="rounded-full" size="icon">
            <Trash2 />
          </Button>
        </div>
        <div className="mx-auto flex items-center justify-center">
          <Button variant="ghost" className="rounded-full" size="icon">
            <IconPhotoFilled />
          </Button>
          <Button variant="ghost" className="rounded-full" size="icon">
            <IconPanoramaHorizontalFilled />
          </Button>
          <Button variant="ghost" className="rounded-full" size="icon">
            <IconMapPinFilled />
          </Button>
          <Button variant="ghost" className="rounded-full" size="icon">
            <IconSearch />
          </Button>
        </div>
      </main>
    </>
  );
}
