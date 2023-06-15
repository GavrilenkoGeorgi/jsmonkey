import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'

import items from '../../../data/projects.json'

import styles from './MainSlider.module.sass'

const MainSlider: FC = () => {

  const itemsToShow = items.slice(0, 2)

  const settings = {
    infinite: true,
    speed: 1000,
    draggable: false
  }

  const navSettings = {
    draggable: false,
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
        <div key={item.id} className={styles.swipeItem}>
          <div className={styles.imgBox}>
            <Image
              src={item.imageUrl}
              alt="Slide"
              width={4368}
              height={2892}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        </div>
      ))}
    </Slider>
    <Slider
      {...navSettings}
      asNavFor={imgSlider}
      ref={(slider: Slider) => setNavSlider(slider)}>
      {itemsToShow.map(item => (
        <article className={styles.slideDetails} key={item.id}>
          {item.text.map((par, index) => (
            <p
              key={index}
              className={styles.slideText}
            >
              {par}
            </p>
          ))}
          <Link href={`/projects#${item.title}`}>
            <div className={styles.ctaWrap}>
              <div className={styles.ctaContainer}>
                <div className={styles.cta}>
                  Learn more ❯❯❯
                </div>
                <div className={styles.underline}>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </Slider>
  </>
}

export default MainSlider
