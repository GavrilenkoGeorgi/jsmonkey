import { FC } from 'react'
import Image from 'next/image'

import blogHeroImage from '../../assets/images/blog-hero-image.webp'

import styles from './BlogHeroSection.module.sass'

const BlogHeroSection:FC = () => (
  <section className={styles.heroSection}>
    <Image
      src={blogHeroImage}
      alt="Decorative pattern"
      width="2160px"
      height="1215px"
      // layout="intrinsic"
      objectFit="cover"
    />
    <h1 className={styles.heroHeading}>Blog</h1>
  </section>
)

export default BlogHeroSection
