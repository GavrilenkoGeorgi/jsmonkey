import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { socialIconProps } from '../../types'
import styles from './SocialIcon.module.sass'

const SocialIcon:FC<socialIconProps> = (props) => {

  const { image, altText, link } = props

  return <Link href={link} className={styles.socialLink}>
    <Image
      src={image.src}
      alt={altText}
      width="24"
      height="24"
    />
  </Link>
}

export default SocialIcon
