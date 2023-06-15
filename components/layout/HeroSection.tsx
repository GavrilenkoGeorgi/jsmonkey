import { FC } from 'react'
import { Parallax } from 'react-parallax'
import { heroSectionProps } from '../../types'

import styles from './HeroSection.module.sass'

const HeroSection: FC<heroSectionProps> = (props) => {

  const { heading, image } = props

  // console.log(heading)

  /* const insideStyles = {
    background: 'white',
    padding: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  } */

  return <Parallax
    strength={500}
    bgImage={image.src}
    bgImageAlt='Main page pattern.'
    bgImageSizes='(max-width: 500px) 50vw, 100vw'
    // className={styles.heroSection}
  >
    <div className={styles.parallax}>
      <div className={styles.headingContainer}>
        <h1>
          {heading}
        </h1>
      </div>
    </div>
  </Parallax>
}

export default HeroSection
