import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { useEmblaSelectedIndex } from "../../../hooks";
import { SLIDER_IMG_SIZES } from "../../../utils/constants";
import items from "../../../data/projects.json";
import styles from "./MainSlider.module.sass";

const itemsToShow = [...items].sort((a, b) => a.id - b.id);

const MainSlider: FC = () => {
  const { emblaRef, emblaApi, selectedIndex } = useEmblaSelectedIndex();

  const currentItem = itemsToShow[selectedIndex];

  return (
    <div>
      <div className={styles.carouselWrapper}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.slideContainer}>
            {itemsToShow.map((item) => (
              <div key={item.id} className={styles.slide}>
                <div className={styles.imgBox}>
                  <Image
                    src={item.imageUrl}
                    alt={`${item.title} slide.`}
                    width={4368}
                    height={2892}
                    sizes={SLIDER_IMG_SIZES}
                    className={`${styles.slideImg} ${styles.slideImgDesktop}`}
                  />
                  <Image
                    src={item.mobileImageUrl}
                    alt={`${item.title} slide.`}
                    width={390}
                    height={844}
                    sizes={SLIDER_IMG_SIZES}
                    className={`${styles.slideImg} ${styles.slideImgMobile}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.prevBtn}
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
        />
        <button
          className={styles.nextBtn}
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
        />
      </div>
      <article className={styles.slideDetails} key={selectedIndex}>
        {currentItem.text.map((par, index) => (
          <p key={index} className={styles.slideText}>
            {par}
          </p>
        ))}
        <Link href={`/projects#${currentItem.title}`}>
          <div className={styles.ctaWrap}>
            <div className={styles.ctaContainer}>
              <div className={styles.cta}>More info ❯❯❯</div>
              <div className={styles.underline} />
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default MainSlider;
