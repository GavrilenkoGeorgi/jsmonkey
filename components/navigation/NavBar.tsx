import { FC, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { navLink } from '../../types'
import { useScrollDirection, useComponentVisible } from '../../hooks'

import Logo from '../layout/Logo'
import { MenuToggleBtn } from './MenuToggleBtn'
import styles from './NavBar.module.sass'

const NavBar:FC = () => {

  const { pathname } = useRouter()
  const scrollDirection = useScrollDirection()

  // mobile menu
  const { ref, isComponentVisible } = useComponentVisible(false)
  const [ open, setOpen ] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if(!isComponentVisible) setOpen(false)
  }, [isComponentVisible])

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
      <a onClick={toggleMenu} className={pathname === link.url
        ? `${styles.navLink} ${styles.current}`
        : styles.navLink}
      >
        {link.label}
      </a>
    </Link>
  )

  const navbarStyle = `${styles.nav} ${ scrollDirection === 'down' ? styles.hiddenNav : styles.visibleNav }`

  return <nav className={navbarStyle} ref={ref}>
    <div className={styles.navigationContainer}>
      <Logo />
      <div
        className={styles.toggleBtnContainer}
        onClick={toggleMenu}
      >
        <MenuToggleBtn open={open}/>
      </div>
      <div
        className={`${styles.linksContainer} ${ open ? styles.open : null }`}
      >
        {navLinks}
      </div>
    </div>
  </nav>
}

export default NavBar
