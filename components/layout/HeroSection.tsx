import { FC } from 'react'
import Image from 'next/image'
import { heroSectionProps } from '../../types'

import styles from './HeroSection.module.sass'

const HeroSection: FC<heroSectionProps> = (props) => {

  const {heading, image} = props

  return <section className={styles.heroSection}>
    <Image
      src={image.src}
      alt="Decorative pattern"
      priority
      fill
    />
    <div className={styles.headingContainer}>
      <h1 className={styles.heroHeading}>
        {heading}
      </h1>
    </div>
  </section>
}

export default HeroSection
