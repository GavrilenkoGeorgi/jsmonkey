import { format } from "date-fns";
import { motion,useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { BlogProps } from "../../types";
import styles from "./ListOfPosts.module.sass";
import PostCard from "./PostCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: "25%" },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const ListOfPosts: FC<BlogProps> = ({ posts }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.set("hidden");
      controls.start("visible");
    }
  }, [controls, inView, posts]);

  return (
    <section className={styles.postsListSection}>
      <motion.ul
        className={styles.listContainer}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {posts.map((post) => (
          <motion.li key={post.slug} variants={cardVariants}>
            <PostCard
              {...post}
              date={format(new Date(post.date), "MMMM do yyyy")}
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default ListOfPosts;
