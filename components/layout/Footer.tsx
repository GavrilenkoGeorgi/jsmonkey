import { FC } from 'react'

import Image from 'next/image'
import styles from '../../styles/Main.module.scss'


const Footer:FC = () => {
  return <>
    <footer className={styles.footer}>
      <a
        href="/"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        It ain't much but it's honest work.{' '}{'{ JS }'}
        {/* <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span> */}
      </a>
    </footer>
  </>
}

export default Footer
