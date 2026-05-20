import Image from "next/image";
import { FC } from "react";

import { useEmblaSelectedIndex } from "../../../hooks";
import { ProjectCarouselProps } from "../../../types";
import { SLIDER_IMG_SIZES } from "../../../utils/constants";
import styles from "./ProjectSlider.module.sass";

const ProjectSlider: FC<ProjectCarouselProps> = ({
  title,
  images,
  priority,
}) => {
  const { emblaRef, emblaApi, selectedIndex } = useEmblaSelectedIndex();

  return (
    <div>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.slideContainer}>
          {images.map((url, index) => (
            <div key={url} className={styles.slide}>
              <div className={styles.imgBox}>
                <Image
                  src={url}
                  alt={`${title} slide ${index}`}
                  width={1170}
                  height={2532}
                  priority={priority}
                  sizes={SLIDER_IMG_SIZES}
                  className={styles.slideImg}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;
