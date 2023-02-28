import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { navLink } from '../../types'
import { useScrollDirection } from '../../hooks'

import Logo from '../layout/Logo'
import styles from './NavBar.module.sass'

const NavBar:FC = () => {

  const { pathname } = useRouter()
  const scrollDirection = useScrollDirection()

  const navigation: Array<navLink> = [
    {
      label: 'Blog',
      url: '/blog'
    },
    {
      label: 'Projects',
      url: '/projects'
    }
  ]

  const navLinks = navigation.map(link =>
    <Link href={link.url}
      key={link.url}
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

  const navbarStyle = `${styles.nav} ${ scrollDirection === 'down' ? styles.hiddenNav : styles.visibleNav }`

  return <nav className={navbarStyle}>
    <div className={styles.navigationContainer}>
      <Logo />
      <div className={styles.linksContainer}>
        {navLinks}
      </div>
    </div>
  </nav>
}

export default NavBar
