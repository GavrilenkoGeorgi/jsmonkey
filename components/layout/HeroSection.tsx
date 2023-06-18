import { FC } from 'react'
import Image from 'next/image'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'
import { heroSectionProps } from '../../types'

import { useNextImageImageFade } from '../../hooks'
import styles from './HeroSection.module.sass'

const HeroSection: FC<heroSectionProps> = (props) => {

  const { heading, image } = props

  return <ParallaxBanner
    className={styles.parallax}
  >
    <ParallaxBannerLayer
      speed={-20}
    >
      <Image
        src={image.src}
        priority
        width={3840}
        height={2160}
        alt='Hero parallax pattern.'
        {...useNextImageImageFade(styles.heroImg)}
      />
    </ParallaxBannerLayer>
    <div className={styles.headingContainer}>
      <h1>
        {heading}
      </h1>
    </div>
  </ParallaxBanner>
}

export default HeroSection
