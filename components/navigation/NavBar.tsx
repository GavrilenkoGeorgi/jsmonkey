import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { navLink } from '../../types'

import Logo from '../Logo'

import styles from './NavBar.module.sass'

const NavBar:FC = () => {

  const { pathname } = useRouter()

  const navigation: Array<navLink> = [
    {
      id: 'id-1',
      label: 'Blog',
      url: '/blog'
    },
    {
      id: 'id-2',
      label: 'Projects',
      url: '/projects'
    }
  ]

  const navLinks = navigation.map(link =>
    <Link href={link.url}
      key={link.id}
      legacyBehavior // check this again later
    >
      <span className={pathname === link.url
        ? `${styles.navLink} ${styles.current}`
        : styles.navLink}
      >
        {link.label}
      </span>
    </Link>
  )

  return <nav className={styles.nav}>
    <div className={styles.navigationContainer}>
      <Logo />
      <div className={styles.linksContainer}>
        {navLinks}
      </div>
    </div>
  </nav>
}

export default NavBar
