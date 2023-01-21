import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import icon from '../assets/icons/icon-js.svg'
import styles from './Logo.module.sass'

const Logo:FC = () => {
  return <Link href="/" className={styles.logo}>
    <Image
      src={icon}
      alt="Logo icon."
      width="36"
      height="36"
    />
  </Link>
}

export default Logo
