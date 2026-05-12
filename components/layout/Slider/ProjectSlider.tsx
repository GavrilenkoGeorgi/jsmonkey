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

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div>
      <div
        className={styles.viewport}
        ref={emblaRef}
        style={{ overflow: "hidden" }}
      >
        <div className={styles.slideContainer} style={{ display: "flex" }}>
          {images.map((url, index) => (
            <div
              key={url}
              className={styles.slide}
              style={{ flex: "0 0 100%", minWidth: 0, overflow: "hidden" }}
            >
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
