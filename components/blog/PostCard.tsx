import { FC } from 'react'
import Image from 'next/image'

import { postCardProps } from '../../types'
import styles from './PostCard.module.sass'

const PostCTA: FC<postCardProps> = (props) => {

  const { date, title, image, author } = props

  // console.log('CTA props: ', props)

  return <div className={styles.cardContainer}>
    <Image
      src={`http://${process.env.API_HOST}${image}`}
      alt="Decorative pattern"
      className={styles.cardImg}
      width="450"
      height="250"
      // layout="responsive"
      // objectFit="cover"
    />

    <div className={styles.postInfoContainer}>
      <div className={styles.postMetaInfo}>
        <span className={styles.authorName}>{author}</span>
        <span className={styles.timestamp}>{date}</span>
      </div>
      <h2 className={styles.heading}>{title}</h2>
    </div>
  </div>
}

export default PostCTA
