import { FC, useState, useEffect } from 'react'
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

  // hide on outside click
  useEffect(() => {
    if(!isComponentVisible) setOpen(false)
  }, [isComponentVisible])

  // close mobile menu and hide overlay on scroll
  useEffect(() => {
    setOpen(prevState => {
      return prevState && false
    })
  }, [scrollDirection])

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

  return <>
    <nav className={navbarStyle} ref={ref}>
      <div className={styles.navigationContainer}>
        <Logo />
        <div
          className={styles.toggleBtnContainer}
          onClick={toggleMenu}
        >
          <MenuToggleBtn open={open}/>
        </div>
        <div
          className={`${styles.linksContainer} ${open && styles.open}`}
        >
          {navLinks}
        </div>
      </div>
    </nav>
    {open && <div className={styles.overlay}></div>}
  </>
}

export default NavBar
