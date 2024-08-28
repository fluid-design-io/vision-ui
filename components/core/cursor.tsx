"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const CONSTANTS = {
  TEXT_ELEMENT_TAGS: ["P", "SPAN", "H1", "H2", "H3", "H4", "TEXTAREA"],
  HOVER_ELEMENT_TAGS: ["BUTTON", "A", "INPUT", "LABEL", "SELECT", "TEXTAREA"],
  DEFAULT_CURSOR_SIZE: 20,
  CURSOR_BORDER_RADIUS: 10,
  DEFAULT_CURSOR_OPACITY: 0.5,
  TEXT_CURSOR_OPACITY: 0.8,
  ACTIVE_CURSOR_OPACITY: 0.2,
  HOVER_EFFECT_X_MULTIPLIER: 2,
  HOVER_EFFECT_Y_MULTIPLIER: 6,
  HOVER_EFFECT_SCALE_MULTIPLIER: 1.05,
  SHINE_SIZE: 100,
  SHINE_OPACITY: 0.7,
  CLICK_ELEMENT_SCALE: 0.97,
  CLICK_CURSOR_SCALE: 0.9,
};

export const Cursor = () => {
  const cursorRef = useRef(null);
  const isCursorLockedRef = useRef(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null,
  );

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorWidth = useMotionValue(CONSTANTS.DEFAULT_CURSOR_SIZE);
  const cursorHeight = useMotionValue(CONSTANTS.DEFAULT_CURSOR_SIZE);
  const cursorOpacity = useMotionValue(CONSTANTS.DEFAULT_CURSOR_OPACITY);
  const cursorScale = useMotionValue(1);
  const cursorBorderRadius = useMotionValue(CONSTANTS.CURSOR_BORDER_RADIUS);

  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);

  const shineX = useMotionValue(0);
  const shineY = useMotionValue(0);

  const springConfig = { stiffness: 85, damping: 8, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorWidthSpring = useSpring(cursorWidth, springConfig);
  const cursorHeightSpring = useSpring(cursorHeight, springConfig);
  const cursorOpacitySpring = useSpring(cursorOpacity, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, springConfig);
  const cursorBorderRadiusSpring = useSpring(cursorBorderRadius, springConfig);

  const cursorLeft = useTransform<number, number>(
    [cursorXSpring, cursorWidthSpring],
    ([x, width]) => x - width / 2,
  );
  const cursorTop = useTransform<number, number>(
    [cursorYSpring, cursorHeightSpring],
    ([y, height]) => y - height / 2,
  );

  const handleElementMouseMove = (event: MouseEvent) => {
    if (
      hoveredElement &&
      CONSTANTS.HOVER_ELEMENT_TAGS.includes(hoveredElement.tagName)
    ) {
      const rect = hoveredElement.getBoundingClientRect();
      const halfHeight = rect.height / 2;
      const topOffset = (event.clientY - rect.top - halfHeight) / halfHeight;
      const halfWidth = rect.width / 2;
      const leftOffset = (event.clientX - rect.left - halfWidth) / halfWidth;
      translateX.set(leftOffset * CONSTANTS.HOVER_EFFECT_X_MULTIPLIER);
      translateY.set(topOffset * CONSTANTS.HOVER_EFFECT_Y_MULTIPLIER);

      shineX.set(event.clientX - rect.left - CONSTANTS.SHINE_SIZE / 2);
      shineY.set(event.clientY - rect.top - CONSTANTS.SHINE_SIZE / 2);

      animate(
        hoveredElement,
        {
          x: leftOffset * CONSTANTS.HOVER_EFFECT_X_MULTIPLIER * 4,
          y: topOffset * CONSTANTS.HOVER_EFFECT_Y_MULTIPLIER,
          scale: CONSTANTS.HOVER_EFFECT_SCALE_MULTIPLIER,
        },
        { duration: 0.1 },
      );
    }
  };

  const handleElementMouseLeave = (e: MouseEvent) => {
    if (hoveredElement) {
      if (CONSTANTS.HOVER_ELEMENT_TAGS.includes(hoveredElement.tagName)) {
        cursorWidth.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        cursorHeight.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        translateX.set(0);
        translateY.set(0);

        cursorBorderRadiusSpring.set(CONSTANTS.CURSOR_BORDER_RADIUS);
        cursorOpacitySpring.set(CONSTANTS.DEFAULT_CURSOR_OPACITY);
        isCursorLockedRef.current = false;
      }
    }
  };

  const handleElementMouseDown = (event: MouseEvent) => {
    if (
      hoveredElement &&
      CONSTANTS.HOVER_ELEMENT_TAGS.includes(hoveredElement.tagName)
    ) {
      animate(
        hoveredElement,
        { scale: CONSTANTS.CLICK_ELEMENT_SCALE },
        springConfig,
      );
      cursorScaleSpring.set(CONSTANTS.CLICK_CURSOR_SCALE);
    }
  };

  const handleElementMouseUp = (event: MouseEvent) => {
    if (
      hoveredElement &&
      CONSTANTS.HOVER_ELEMENT_TAGS.includes(hoveredElement.tagName)
    ) {
      animate(
        hoveredElement,
        { scale: CONSTANTS.HOVER_EFFECT_SCALE_MULTIPLIER },
        springConfig,
      );
      cursorScaleSpring.set(1);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isCursorLockedRef.current) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }
    const element = document.elementFromPoint(
      e.clientX,
      e.clientY,
    ) as HTMLElement;

    if (hoveredElement !== element) {
      setHoveredElement(element);

      if (CONSTANTS.HOVER_ELEMENT_TAGS.includes(element.tagName)) {
        isCursorLockedRef.current = true;
        const rect = element.getBoundingClientRect();
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
        cursorWidth.set(rect.width + 8);
        cursorHeight.set(rect.height + 8);
        cursorBorderRadiusSpring.set(
          parseInt(window.getComputedStyle(element).borderRadius) + 4,
        );
        cursorOpacitySpring.set(CONSTANTS.ACTIVE_CURSOR_OPACITY);
      } else if (CONSTANTS.TEXT_ELEMENT_TAGS.includes(element.tagName)) {
        isCursorLockedRef.current = false;
        const fontSize = window
          .getComputedStyle(element)
          .getPropertyValue("font-size");
        cursorWidth.set(2);
        cursorHeight.set(parseInt(fontSize));
        cursorBorderRadiusSpring.set(0);
        cursorOpacitySpring.set(CONSTANTS.TEXT_CURSOR_OPACITY);
      } else {
        isCursorLockedRef.current = false;
        cursorWidth.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        cursorHeight.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        cursorBorderRadiusSpring.set(CONSTANTS.CURSOR_BORDER_RADIUS);
        cursorOpacitySpring.set(CONSTANTS.DEFAULT_CURSOR_OPACITY);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hoveredElement) {
      hoveredElement.addEventListener("mousemove", handleElementMouseMove);
      hoveredElement.addEventListener("mouseleave", handleElementMouseLeave);
      hoveredElement.addEventListener("mousedown", handleElementMouseDown);
      hoveredElement.addEventListener("mouseup", handleElementMouseUp);
    }

    return () => {
      if (hoveredElement) {
        hoveredElement.removeEventListener("mousemove", handleElementMouseMove);
        hoveredElement.removeEventListener(
          "mouseleave",
          handleElementMouseLeave,
        );
        hoveredElement.removeEventListener("mousedown", handleElementMouseDown);
        hoveredElement.removeEventListener("mouseup", handleElementMouseUp);
        animate(
          hoveredElement,
          {
            scale: 1,
            x: 0,
            y: 0,
          },
          springConfig,
        );
      }
    };
  }, [hoveredElement]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-50 overflow-hidden"
      style={{
        left: cursorLeft,
        top: cursorTop,
        width: cursorWidthSpring,
        height: cursorHeightSpring,
        opacity: cursorOpacitySpring,
        backgroundColor: "gray",
        borderRadius: cursorBorderRadiusSpring,
        scale: cursorScaleSpring,
        translateX: translateX,
        translateY: translateY,
      }}
    >
      <motion.div
        className="absolute"
        style={{
          width: CONSTANTS.SHINE_SIZE,
          height: CONSTANTS.SHINE_SIZE,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          opacity: CONSTANTS.SHINE_OPACITY,
          left: shineX,
          top: shineY,
          mixBlendMode: "lighten",
        }}
      />
    </motion.div>
  );
};
