"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";

export const HeroLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (!isDesktop)
    return (
      <div>
        <h2>This component is only supported on desktop</h2>
      </div>
    );
  return <div>{children}</div>;
};
