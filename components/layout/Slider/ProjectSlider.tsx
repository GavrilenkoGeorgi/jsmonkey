import type { FC } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'

import { useNextImageImageFade } from '../../../hooks'
import { projectCarouselProps } from '../../../types'
import { SLIDER_IMG_SIZES } from '../../../utils/constants'
import styles from './ProjectSlider.module.sass'

const ProjectSlider: FC<projectCarouselProps> = ({ title, images, priority }) => {

  const settings = {
    dots: true,
    arrows: false
  }

  return <Slider {...settings}>
    {images.map((url, index) => (
      <div key={url} className={styles.swipeItem}>
        <div className={styles.imgBox}>
          <Image
            src={url}
            alt={`${title} slide ${index}`}
            width={1170}
            height={2532}
            priority={priority}
            sizes={SLIDER_IMG_SIZES}
            {...useNextImageImageFade(styles.slide)}
          />
        </div>
      </div>
      ))}
  </Slider>
}

export default ProjectSlider
