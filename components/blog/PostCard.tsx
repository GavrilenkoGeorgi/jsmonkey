import { FC } from 'react'
import Image from 'next/image'

import { postCardProps } from '../../types'
import styles from './PostCard.module.sass'

const PostCTA: FC<postCardProps> = (props) => {

  const { date, title, image, author } = props

  const imgStyle = { // what's this?
    border: 'none',
    'object-fit': 'cover',
    'max-height': '9rem'
  }

  console.log(`https://${process.env.API_HOST}${image}`)

  return <div className={styles.cardContainer}>
    <Image
      src={`https://${process.env.API_HOST}${image}`}
      alt="Decorative pattern"
      className={styles.cardImg}
      fill
      style={imgStyle}
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
