import { FC } from 'react'
import Image from 'next/image'
import { heroSectionProps } from '../../types'

import styles from './HeroSection.module.sass'

const HeroSection:FC<heroSectionProps> = (props) => {

  const {heading, image} = props

return <section className={styles.heroSection}>
    <Image
      src={image.src}
      alt="Decorative pattern"
      width="2160"
      height="1215"
    />
    <h1 className={styles.heroHeading}>
      {heading}
    </h1>
  </section>
}

export default HeroSection
