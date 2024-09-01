"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import heroImage from "@/public/assets/hero-image.webp";
import Image from "next/image";

export const HeroLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (!isDesktop)
    return (
      <div>
        <Image src={heroImage} alt="hero" />
        <p>Use a larger screen to interact</p>
      </div>
    );
  return <div>{children}</div>;
};
