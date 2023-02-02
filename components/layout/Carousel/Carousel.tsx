import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'

import items from '../../../data/projects.json'
import prevArrow from './PrevArrow'
import nextArrow from './NextArrow'
import dots from './Dots'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './Carousel.module.sass'

const ResponsiveCarousel: FC = () => {

  return <div className={styles.container}>
    <Carousel
      className={styles.mySwiper}
      showIndicators={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      showArrows={true}
      autoPlay={false}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={25}
      renderArrowPrev={prevArrow}
      renderArrowNext={nextArrow}
      renderIndicator={dots}
      transitionTime={1000}
    >
      {items.map((item) => (
        <div key={item.id} className={styles.swipeItem}>
          <div className={styles.imgBox}>
            <Image
              src={item.imageUrl}
              alt="Slide"
              width={4368}
              height={2892}
            />
          </div>
          <div className={styles.slideDetails}>
            <p className={styles.slideText}>{item.text}</p>
            <Link href={`/projects#${item.title}`}>
              <button className={styles.slideCTA}>
                More info
              </button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
}

export default ResponsiveCarousel
