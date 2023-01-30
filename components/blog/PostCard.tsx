import { FC } from 'react'
import Image from 'next/image'

import { postCardProps } from '../../types'
import styles from './PostCard.module.sass'

const PostCTA: FC<postCardProps> = (props) => {

  const { date, title, image } = props

  return <div className={styles.cardContainer}>
    <div className={styles.imgContainer}>
      <Image
        src={`${image}`}
        // but not this
        // src={image}
        alt="Decorative pattern"
        className={styles.cardImg}
        fill
      />
    </div>

    <div className={styles.postInfoContainer}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.postMetaInfo}>
        <span className={styles.timestamp}>{date}</span>
      </div>
    </div>
  </div>
}

export default PostCTA
