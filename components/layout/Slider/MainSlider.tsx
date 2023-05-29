import { FC, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'

import items from '../../../data/projects.json'
import Button from '../Button'

import styles from './MainSlider.module.sass'

const MainSlider: FC = () => {

  const settings = {
    centerMode: true,
    slidesToShow: 1,
    centerPadding: '15px',
    infinite: false,
    speed: 1000,
    cssEase: 'ease-out'
  }

  const navSettings = {
    arrows: false,
    fade: true,
    speed: 1000
  }

  const [navSlider, setNavSlider] = useState<Slider>()
  const [imgSlider, setImgSlider] = useState<Slider>()

  return <>
    <Slider {...settings} asNavFor={navSlider} ref={(slider: Slider) => setImgSlider(slider)}>
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
        </div>
        ))}
    </Slider>
    <Slider
      {...navSettings}
      asNavFor={imgSlider}
      ref={(slider: Slider) => setNavSlider(slider)}>
      {items.map((item) => (
        <article className={styles.slideDetails} key={item.id}>
          <p className={styles.slideText}>{item.text}</p>
          <Button
            link={`/projects#${item.title}`}
            label='More info'
          />
        </article>
      ))}
    </Slider>
  </>
}

export default MainSlider
