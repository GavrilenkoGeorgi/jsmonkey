import type { FC } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'

import { projectCarouselProps } from '../../../types'

import styles from './ProjectSlider.module.sass'

const ProjectSlider: FC<projectCarouselProps> = ({ images }) => {

  const settings = {
    dots: true,
    arrows: false
  }

  return <Slider {...settings}>
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
  </Slider>
}

export default ProjectSlider
