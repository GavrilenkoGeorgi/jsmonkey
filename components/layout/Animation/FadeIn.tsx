"use client";

import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { LayoutProps } from "../../../types";

type FadeInProps = LayoutProps & {
  initialInView?: boolean;
  threshold?: number;
  rootMargin?: string;
};

const slideIn = {
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: "+15%" },
};

const FadeIn: FC<FadeInProps> = ({
  children,
  initialInView = false,
  threshold = 0,
  rootMargin = "0px",
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ initialInView, threshold, rootMargin });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={slideIn}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
