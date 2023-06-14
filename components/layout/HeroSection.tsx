import { FC } from 'react'
import { Parallax } from 'react-parallax'
import { heroSectionProps } from '../../types'

import styles from './HeroSection.module.sass'

const HeroSection: FC<heroSectionProps> = (props) => {

  const { heading, image } = props

  return <Parallax
    strength={500}
    bgImage={image.src}
    bgImageAlt='Main page pattern.'
    className={styles.heroSection}
    renderLayer={() => (
      <div className={styles.headingContainer}>
        <h1 className={styles.heroHeading}>
          {heading}
        </h1>
      </div>
    )}
  >
  </Parallax>
}

export default HeroSection
