import { FC } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { layoutProps } from "../../types";

const variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: -50,
    transition: {
      duration: 0.5,
    },
  },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: {
    opacity: 0,
    x: 0,
    y: -50,
    transition: {
      duration: 0.5,
    },
  },
};

const Transition: FC<layoutProps> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence
      initial={false}
      mode="wait"
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={asPath}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ ease: "linear" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
