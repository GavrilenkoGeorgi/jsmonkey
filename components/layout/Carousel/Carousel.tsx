import { MouseEventHandler } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'

import items from '../../../data/projects.json'
import arrowLeft from '../../../assets/icons/icon-arrow-left.svg'
import arrowRight from '../../../assets/icons/icon-arrow-right.svg'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './Carousel.module.sass'

const ResponsiveCarousel: NextPage = () => {

  const leftArrow = (clickHandler: MouseEventHandler<HTMLButtonElement>,
    hasPrev: boolean,
    label: string) => {
    return <div className={styles.leftArrowContainer}>
        <button
          onClick={clickHandler}
          className={styles.leftArrow}
        >
        <Image
          src={arrowLeft}
          alt="Previous slide arrow icon."
          width={100}
          height={100}
        />
      </button>
    </div>
  }
  // different styles, image and alt tag
  const rightArrow = (clickHandler: MouseEventHandler<HTMLButtonElement>,
    hasPrev: boolean,
    label: string) => {
    return <div className={styles.rightArrowContainer}>
        <button
          onClick={clickHandler}
          className={styles.rightArrow}
        >
        <Image
          src={arrowRight}
          alt="Next slide arrow icon."
          width={100}
          height={100}
        />
      </button>
    </div>
  }
  // dots
  const dots = (onClickHandler: MouseEventHandler<HTMLButtonElement>,
    isSelected: boolean,
    index: number,
    label: string) => {
    const defStyle = { margin: '.4rem', color: 'lightgray', cursor: 'pointer', fontSize: '300%', transition: 'color .5s ease-in' }
    const style = isSelected
      ? { ...defStyle, color: 'gray' }
      : { ...defStyle }

    return (
      <span
        style={style}
        onClick={onClickHandler}
        // onKeyDown={onClickHandler}
        key={index}
        role='button'
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
      >
        •
      </span>
    )
  }

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
      // arrows
      renderArrowPrev={leftArrow}
      renderArrowNext={rightArrow}
      // dots
      renderIndicator={dots}
    >
      {items.map((item) => (
        <div key={item.id} className={styles.swipeItem}>
          <div className={styles.imgBox}>
            <Image src={item.imageUrl} alt="Slide" width={474} height={889} />
          </div>
          <div className={styles.slideDetails}>
            <Link href={item.url}>
              <h3 className={styles.slideHeading}>
                {item.url}
              </h3>
            </Link>
            <p className={styles.slideText}>{item.text}</p>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
}

export default ResponsiveCarousel
