"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CardContainer({ children, className, containerClassName }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-8, 8]);

  function handleMouseMove({ clientX, clientY }) {
    const bounds = ref.current.getBoundingClientRect();

    const mouseX = clientX - bounds.x;
    const mouseY = clientY - bounds.y;

    const newX = mouseX / bounds.width;
    const newY = mouseY / bounds.height;

    x.set(newX);
    y.set(newY);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      className={containerClassName}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function CardBody({ children, className }) {
  return (
    <div
      className={`relative h-full w-full rounded-xl bg-white dark:bg-black ${className}`}
    >
      {children}
    </div>
  );
}

export function CardItem({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}) {
  return (
    <motion.div
      style={{
        translateX,
        translateY,
        translateZ,
        rotateX,
        rotateY,
        rotateZ,
        transformStyle: "preserve-3d",
      }}
      className={className}
      as={Tag}
    >
      {children}
    </motion.div>
  );
}
