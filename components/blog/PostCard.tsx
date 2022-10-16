import { FC } from 'react'
import Image from 'next/image'

import { postCardProps } from '../../types'
import styles from './PostCard.module.sass'

const PostCTA: FC<postCardProps> = (props) => {

  const { date, title, image, author } = props

  console.log('CTA props: ', props)

  return <div className={styles.cardContainer}>
      <img className={styles.cardImage} src={`http://${process.env.API_HOST}${image}`} />

      {/* <Image
        src={`http://${process.env.API_HOST}${image}`}
        alt="Decorative pattern"
        className={styles.cardImg}
        layout="fill"
        width="620"
        height="480"
        objectFit="contain"
      /> */}
    {/* </div> */}

    <div className={styles.postInfoContainer}>
    <h2 className={styles.heading}>{title}</h2>
    <span className={styles.authorName}>{author}</span>
    <div>{date}</div>

    </div>
  </div>
}

export default PostCTA
