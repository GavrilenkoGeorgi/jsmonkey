import { FC } from 'react'
import Link from 'next/link'

import Logo from './Logo'
import SocialIcon from './SocialIcon'
import facebookIcon from '../../assets/icons/icon-facebook.svg'
import instagramIcon from '../../assets/icons/icon-instagram.svg'
import githubIcon from '../../assets/icons/icon-github.svg'

import styles from './Footer.module.sass'

const Footer:FC = () => {
  return <footer className={styles.footer}>
    <div>
      <Logo />
    </div>
    <div className={styles.socialLinksContainer}>
      <Link
        href="/"
        className={styles.textLink}
      >
        I build things.
      </Link>
      <SocialIcon
        image={facebookIcon}
        link="https://facebook.com/gavrilenko.georgi"
        altText="Facebook icon."
      />
      <SocialIcon
        image={githubIcon}
        link="https://github.com/GavrilenkoGeorgi"
        altText="Github icon."
      />
    </div>
  </footer>
}

export default Footer
