import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { useNextImageImageFade } from "../../hooks";
import { PostCardProps } from "../../types";
import { POSTCARD_IMG_SIZES } from "../../utils/constants";
import styles from "./PostCard.module.sass";

const PostCTA: FC<PostCardProps> = (props) => {
  const { date, title, image, slug, tags } = props;

  return (
    <article className={styles.cardContainer}>
      <Link href={`/blog/${slug}`}>
        <div className={styles.imgContainer} style={{ position: "relative" }}>
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
