"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  CustomValueType,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const CONSTANTS = {
  TEXT_ELEMENT_TAGS: ["P", "SPAN", "H1", "H2", "H3", "H4", "TEXTAREA"],
  HOVER_ELEMENT_TAGS: ["BUTTON", "A", "INPUT", "LABEL", "SELECT", "TEXTAREA"],
  CURSOR_SPRING_CONFIG: { stiffness: 90, damping: 8, mass: 0.02 },
  DEFAULT_SPRING_CONFIG: { stiffness: 90, damping: 8, mass: 0.2 },
  CLICK_SPRING_CONFIG: { duration: 0.12 },
  DEFAULT_CURSOR_SIZE: 20,
  CURSOR_BORDER_RADIUS: 10,
  CURSOR_BLUR: 4,
  DEFAULT_CURSOR_OPACITY: 0.5,
  TEXT_CURSOR_OPACITY: 0.9,
  ACTIVE_CURSOR_OPACITY: 0.3,
  HOVER_EFFECT_X_MULTIPLIER: 1,
  HOVER_EFFECT_Y_MULTIPLIER: 4,
  SHINE_SIZE: 100,
  SHINE_OPACITY: 0.65,
  CLICK_ELEMENT_SCALE: 0.95,
  CLICK_CURSOR_SCALE: 0.9,
};

const CursorInner = () => {
  const cursorRef = useRef(null);
  const isCursorLockedRef = useRef(false);

  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null,
  );

  const cursorXSpring = useSpring(0, CONSTANTS.CURSOR_SPRING_CONFIG);
  const cursorYSpring = useSpring(0, CONSTANTS.CURSOR_SPRING_CONFIG);
  const cursorWidthSpring = useSpring(
    CONSTANTS.DEFAULT_CURSOR_SIZE,
    CONSTANTS.CURSOR_SPRING_CONFIG,
  );
  const cursorHeightSpring = useSpring(
    CONSTANTS.DEFAULT_CURSOR_SIZE,
    CONSTANTS.CURSOR_SPRING_CONFIG,
  );
  const cursorOpacitySpring = useSpring(
    CONSTANTS.DEFAULT_CURSOR_OPACITY,
    CONSTANTS.CURSOR_SPRING_CONFIG,
  );
  const cursorScaleSpring = useSpring(1, CONSTANTS.DEFAULT_SPRING_CONFIG);
  const cursorBorderRadiusSpring = useSpring(CONSTANTS.CURSOR_BORDER_RADIUS, {
    bounce: 0,
  });
  const cursorBlurSpring = useSpring(
    CONSTANTS.CURSOR_BLUR,
    CONSTANTS.DEFAULT_SPRING_CONFIG,
  );

  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);

  const shineX = useMotionValue(0);
  const shineY = useMotionValue(0);

  const cursorBackgroundOpacity = useSpring(1, { bounce: 0 });

  const cursorBlurSpringString = useMotionTemplate`blur(${cursorBlurSpring}px)`;
  const cursorBackgroundColorString = useMotionTemplate`rgba(128, 128, 128, ${cursorBackgroundOpacity})`;

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
      translateX.set(leftOffset * CONSTANTS.HOVER_EFFECT_X_MULTIPLIER * 2);
      translateY.set(topOffset * CONSTANTS.HOVER_EFFECT_Y_MULTIPLIER * 0.5);

      shineX.set(event.clientX - rect.left - CONSTANTS.SHINE_SIZE / 2);
      shineY.set(event.clientY - rect.top - CONSTANTS.SHINE_SIZE / 2);

      animate(
        hoveredElement,
        {
          x: leftOffset * CONSTANTS.HOVER_EFFECT_X_MULTIPLIER * 4,
          y: topOffset * CONSTANTS.HOVER_EFFECT_Y_MULTIPLIER,
          "--btn-bg-translate-x":
            -leftOffset * CONSTANTS.HOVER_EFFECT_X_MULTIPLIER * 2 + "px",
          "--btn-bg-translate-y":
            -topOffset * CONSTANTS.HOVER_EFFECT_Y_MULTIPLIER * 0.5 + "px",
        },
        { type: "keyframes", duration: 0 },
      );
    }
  };

  const handleElementMouseLeave = (e: MouseEvent) => {
    if (hoveredElement) {
      if (CONSTANTS.HOVER_ELEMENT_TAGS.includes(hoveredElement.tagName)) {
        cursorWidthSpring.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        cursorHeightSpring.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        translateX.set(0);
        translateY.set(0);

        cursorBorderRadiusSpring.set(CONSTANTS.CURSOR_BORDER_RADIUS);
        cursorOpacitySpring.set(CONSTANTS.DEFAULT_CURSOR_OPACITY);
        cursorBlurSpring.set(0);
        cursorBackgroundOpacity.set(1);
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
        CONSTANTS.CLICK_SPRING_CONFIG,
      );
      cursorScaleSpring.set(CONSTANTS.CLICK_CURSOR_SCALE);
    }
  };

  const handleElementMouseUp = (event: MouseEvent) => {
    if (
      hoveredElement &&
      CONSTANTS.HOVER_ELEMENT_TAGS.includes(hoveredElement.tagName)
    ) {
      animate(hoveredElement, { scale: 1 }, CONSTANTS.CLICK_SPRING_CONFIG);
      cursorScaleSpring.set(1);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isCursorLockedRef.current) {
      cursorXSpring.set(e.clientX);
      cursorYSpring.set(e.clientY);
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
        cursorXSpring.set(rect.left + rect.width / 2);
        cursorYSpring.set(rect.top + rect.height / 2);
        cursorWidthSpring.set(rect.width - 4);
        cursorHeightSpring.set(rect.height - 4);
        cursorBorderRadiusSpring.set(
          parseInt(window.getComputedStyle(element).borderRadius) - 2,
        );
        cursorOpacitySpring.set(CONSTANTS.ACTIVE_CURSOR_OPACITY);
        cursorBlurSpring.set(CONSTANTS.CURSOR_BLUR);
        cursorBackgroundOpacity.set(0);
      } else if (CONSTANTS.TEXT_ELEMENT_TAGS.includes(element.tagName)) {
        isCursorLockedRef.current = false;
        const fontSize = window
          .getComputedStyle(element)
          .getPropertyValue("font-size");
        cursorWidthSpring.set(2);
        cursorHeightSpring.set(parseInt(fontSize));
        cursorBorderRadiusSpring.set(4);
        cursorOpacitySpring.set(CONSTANTS.TEXT_CURSOR_OPACITY);
      } else {
        isCursorLockedRef.current = false;
        cursorWidthSpring.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        cursorHeightSpring.set(CONSTANTS.DEFAULT_CURSOR_SIZE);
        cursorBorderRadiusSpring.set(CONSTANTS.CURSOR_BORDER_RADIUS);
        cursorOpacitySpring.set(CONSTANTS.DEFAULT_CURSOR_OPACITY);
        cursorBlurSpring.set(0);
        cursorBackgroundOpacity.set(1);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cleanup = () => {
    if (hoveredElement) {
      hoveredElement.removeEventListener("mousemove", handleElementMouseMove);
      hoveredElement.removeEventListener("mouseleave", handleElementMouseLeave);
      hoveredElement.removeEventListener("mousedown", handleElementMouseDown);
      hoveredElement.removeEventListener("mouseup", handleElementMouseUp);

      animate(
        hoveredElement,
        {
          x: 0,
          y: 0,
          "--btn-bg-translate-x": 0 + "px",
          "--btn-bg-translate-y": 0 + "px",
        },
        { type: "spring", duration: 0.4 },
      );
    }
  };

  useEffect(() => {
    if (hoveredElement) {
      hoveredElement.addEventListener("mousemove", handleElementMouseMove);
      hoveredElement.addEventListener("mouseleave", handleElementMouseLeave);
      hoveredElement.addEventListener("mousedown", handleElementMouseDown);
      hoveredElement.addEventListener("mouseup", handleElementMouseUp);
    }

    return cleanup;
  }, [hoveredElement]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-[999] overflow-hidden"
      style={{
        left: cursorLeft,
        top: cursorTop,
        width: cursorWidthSpring,
        height: cursorHeightSpring,
        opacity: cursorOpacitySpring,
        backgroundColor: cursorBackgroundColorString,
        borderRadius: cursorBorderRadiusSpring,
        scale: cursorScaleSpring,
        translateX: translateX,
        translateY: translateY,
        filter: cursorBlurSpringString,
      }}
    >
      <motion.div
        className="absolute"
        style={{
          width: CONSTANTS.SHINE_SIZE,
          height: CONSTANTS.SHINE_SIZE,
          borderRadius: "50%",
          opacity: CONSTANTS.SHINE_OPACITY,
          left: shineX,
          top: shineY,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%), radial-gradient(101.08% 100% at 50% 100%, rgba(94, 94, 94, 0.14) 0%, rgba(94, 94, 94, 0.00) 73.85%), radial-gradient(100.02% 100% at 50% 100%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.00) 55.59%), linear-gradient(0deg, rgba(94, 94, 94, 0.18) 0%, rgba(94, 94, 94, 0.18) 100%), rgba(255, 255, 255, 0.1)",
          mixBlendMode:
            "color-dodge, normal, color-dodge, lighten" as unknown as CustomValueType,
        }}
      />
    </motion.div>
  );
};

const Cursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const checkIfTouchDevice = () => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    // Add or remove a class based on device type
    if (isTouch) {
      document.body.classList.remove("hide-cursor");
    } else {
      document.body.classList.add("hide-cursor");
    }
  };

  useEffect(() => {
    checkIfTouchDevice();
    window.addEventListener("resize", checkIfTouchDevice);

    return () => {
      window.removeEventListener("resize", checkIfTouchDevice);
    };
  }, []);

  return !isTouchDevice ? <CursorInner /> : null;
};

export { Cursor };
