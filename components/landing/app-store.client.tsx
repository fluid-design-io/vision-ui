"use client";
import { useWindowScroll } from "../core/window";
import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { AppStoreView } from "./app-store.server";
export const LibraryView = () => {
  const { scrollY } = useWindowScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const backgroundStyle = useMotionTemplate`rgba(0,0,0,${backgroundOpacity})`;
  return (
    <>
      <motion.div
        className="flex w-full flex-col pb-12"
        style={{ background: backgroundStyle }}
      >
        <AppStoreView />
      </motion.div>
    </>
  );
};
