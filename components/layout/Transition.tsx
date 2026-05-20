import { AnimatePresence,motion } from "framer-motion";
import { useRouter } from "next/router";
import { type FC } from "react";

import { useTransitionAnimationComplete, variants } from "../../hooks";
import { LayoutProps } from "../../types";

const Transition: FC<LayoutProps> = ({ children }) => {
  const { asPath } = useRouter();
  const onAnimationComplete = useTransitionAnimationComplete();

  const navigateToHash = () => {
    const hash = window.location.hash;
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence
      initial={false}
      mode="wait"
      onExitComplete={navigateToHash}
    >
      <motion.div
        key={asPath}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ ease: "linear" }}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
