import type { NextPage } from 'next'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'

import { projectCarouselProps } from '../../../types'

import dots from './Dots'
import prevArrow from './PrevArrow'
import nextArrow from './NextArrow'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ProjectCarousel.module.sass'

const ProjectCarousel: NextPage<projectCarouselProps> = ({ images }) => {

  return <div className={styles.container}>
    <Carousel
      className={styles.mySwiper}
      showIndicators={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      autoPlay={false}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={25}
      renderArrowPrev={prevArrow}
      renderArrowNext={nextArrow}
      renderIndicator={dots}
      transitionTime={900}
    >
      {images.map((url) => (
        <div key={url} className={styles.swipeItem}>
          <div className={styles.imgBox}>
            <Image
              className={styles.slide}
              src={url}
              alt="Project slide."
              width={1170}
              height={2532}
            />
          </div>
        </div>
      ))}
    </Carousel>
  </div>
}

export default ProjectCarousel
