import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { useNextImageImageFade } from "../../hooks";
import { POSTCARD_IMG_SIZES } from "../../utils/constants";
import { postCardProps } from "../../types";
import styles from "./PostCard.module.sass";

const PostCTA: FC<postCardProps> = (props) => {
  const { date, title, image, slug, tags } = props;

  return (
    <article className={styles.cardContainer}>
      <Link href={`/blog/${slug}`}>
        <div className={styles.imgContainer}>
          <Image
            src={`${image}`}
            // but not this
            // src={image}
            alt="Decorative pattern."
            fill
            sizes={POSTCARD_IMG_SIZES}
            {...useNextImageImageFade(styles.cardImg)}
          />
        </div>

        <div className={styles.postInfoContainer}>
          <div className={styles.postMetaInfo}>
            <h2 className={styles.heading}>{title}</h2>
            <div className={styles.tagsContaier}>
              <span className={styles.timestamp}>{date}</span>
              {tags?.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCTA;
