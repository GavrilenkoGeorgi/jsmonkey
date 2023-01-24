import { Carousel } from "react-responsive-carousel"
import { responsive } from "../../../public/data/Projects.json"
import Link from "next/link"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import styles from "./Carousel.module.sass"

export default function ResponsiveCarousel() {

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
      renderIndicator={(onClickHandler, isSelected, index, label) => { // move this somewhere
        const defStyle = { margin: '.2rem', color: 'gray', cursor: 'pointer', fontSize: '300%' }
        const style = isSelected
          ? { ...defStyle, color: 'black' }
          : { ...defStyle }
        return (
          <span
            style={style}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role='button'
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
          >
            •
          </span>
        )
      }}
    >
      {responsive.map((item) => (
        <div key={item.id} className={styles.swipeItem}>
          <div className={styles.imgBox}>
            <img src={item.imageUrl} alt="slides" />
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
