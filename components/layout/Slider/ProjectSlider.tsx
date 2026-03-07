import { FC, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { projectCarouselProps } from "../../../types";
import { SLIDER_IMG_SIZES } from "../../../utils/constants";
import styles from "./ProjectSlider.module.sass";

const ProjectSlider: FC<projectCarouselProps> = ({
  title,
  images,
  priority,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

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
