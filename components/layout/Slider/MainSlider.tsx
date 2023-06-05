import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'

import items from '../../../data/projects.json'
import Button from '../Button'

import styles from './MainSlider.module.sass'

const MainSlider: FC = () => {

  const itemsToShow = items.slice(0, 2)

  const settings = {
    infinite: true,
    speed: 1000,
    draggable: false
  }

  const navSettings = {
    arrows: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    speed: 1000
  }

  const [navSlider, setNavSlider] = useState<Slider>()
  const [imgSlider, setImgSlider] = useState<Slider>()

  return <>
    <Slider {...settings} asNavFor={navSlider} ref={(slider: Slider) => setImgSlider(slider)}>
      {itemsToShow.map(item => (
        <Link href={`/projects#${item.title}`} key={item.id}>
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
      </Link>
      ))}
    </Slider>
    <Slider
      {...navSettings}
      asNavFor={imgSlider}
      ref={(slider: Slider) => setNavSlider(slider)}>
      {itemsToShow.map(item => (
        <article className={styles.slideDetails} key={item.id}>
          <p className={styles.slideText}>{item.text}</p>
        </article>
      ))}
    </Slider>
  </>
}

export default MainSlider
