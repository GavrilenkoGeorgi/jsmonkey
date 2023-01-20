import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Logo from '../Logo'
import styles from './NavBar.module.sass'

type Link = {
  id: string,
  label: string,
  url: string
}

const NavBar:FC = () => {

  const { pathname } = useRouter()

  const navigation: Array<Link> = [
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
      <a className={pathname === link.url
        ? `${styles.navLink} ${styles.current}`
        : styles.navLink}
      >
        {link.label}
      </a>
    </Link>
  )

  return <nav className={styles.nav}>
    <>
      <div className={styles.navigationContainer}>
        <Logo />
        <div className={styles.linksContainer}>
          {navLinks}
        </div>
      </div>
    </>
  </nav>
}

export default NavBar
