import type { NextPage } from 'next'
import Image from 'next/image'
import { projectCarouselProps } from '../../../types'

import { Carousel } from 'react-responsive-carousel'
import prevArrow from './PrevArrow'
import nextArrow from './NextArrow'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ProjectCarousel.module.sass'

const ProjectCarousel: NextPage<projectCarouselProps> = ({ images }) => {

  return <div className={styles.container}>
    <Carousel
      className={styles.mySwiper}
      showIndicators={false}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      autoPlay={false}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={25}
      renderArrowPrev={prevArrow}
      renderArrowNext={nextArrow}
    >
      {images.map((url) => (
        <div key={url} className={styles.swipeItem}>
          <div className={styles.imgBox}>
            <Image
              className={styles.slide}
              src={url}
              alt="Project slide."
              width={1416}
              height={895}
            />
          </div>
        </div>
      ))}
    </Carousel>
  </div>
}

export default ProjectCarousel
