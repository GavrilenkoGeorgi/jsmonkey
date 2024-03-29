import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { navLink } from '../../types'
import { useScrollDirection, useComponentVisible } from '../../hooks'

import Logo from '../layout/Logo'
import { MenuToggleBtn } from './MenuToggleBtn'
import styles from './NavBar.module.sass'

const NavBar:FC = () => {

  const router = useRouter()
  const scrollDirection = useScrollDirection()

  // mobile menu
  const { ref, isComponentVisible } = useComponentVisible(false)
  const [ open, setOpen ] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  // hide on route change
  useEffect(() => {
    router.events.on('routeChangeStart', () => setOpen(false))
    return () => router.events.off('routeChangeStart', setOpen)
  }, [router.events])

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
    scroll={false}
    >
      <button className={router.pathname === link.url
        ? `${styles.navLink} ${styles.current}`
        : styles.navLink}
      >
        {link.label}
      </button>
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
    <div className={`${styles.overlay} ${open ? styles.openOverlay : ''}`}>
    </div>
  </>
}

export default NavBar
