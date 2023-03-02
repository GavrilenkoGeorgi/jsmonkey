import { FC } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'

import items from '../../../data/projects.json'
import Button from '../Button'

import styles from './MainSlider.module.sass'

const MainSlider: FC = () => {

  const settings = {
    dots: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return <Slider {...settings}>
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
          <Button
            link={`/projects#${item.title}`}
            label='More info'
          />
        </div>
      </div>
      ))}
  </Slider>
}

export default MainSlider
