import { FC } from 'react'

import Link from 'next/link'
import styles from './Logo.module.sass'

const Logo:FC = () => {
  return <Link href="/">
    <div className={styles.logo}>
      {'{ JS }'}
    </div>
  </Link>
}

export default Logo
