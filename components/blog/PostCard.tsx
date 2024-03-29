import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useNextImageImageFade } from '../../hooks'
import { POSTCARD_IMG_SIZES } from '../../utils/constants'
import { postCardProps } from '../../types'
import styles from './PostCard.module.sass'

const PostCTA: FC<postCardProps> = (props) => {

  const { date, title, image, slug } = props

  return <div className={styles.cardContainer}>
    <Link href={`/blog/${slug}`}>
      <div className={styles.imgContainer}>
        <Image
          src={`${image}`}
          // but not this
          // src={image}
          alt='Decorative pattern.'
          fill
          sizes={POSTCARD_IMG_SIZES}
          {...useNextImageImageFade(styles.cardImg)}
        />
      </div>

      <div className={styles.postInfoContainer}>
        <div className={styles.postMetaInfo}>
        <h2 className={styles.heading}>{title}</h2>
          <span className={styles.timestamp}>{date}</span>
        </div>
      </div>
    </Link>
  </div>
}

export default PostCTA
