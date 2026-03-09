import { FC } from "react";
import Link from "next/link";

import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
import linkedInIcon from "../../assets/icons/icon-linked-in.svg";
import githubIcon from "../../assets/icons/icon-github.svg";

import styles from "./Footer.module.sass";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Logo />
      </div>
      <div className={styles.socialLinksContainer}>
        <Link
          href="/"
          className={styles.textLink}
          title="Theo stole my slogan."
        >
          <s>I build things.</s>
          <span>I build experiences.</span>
        </Link>
        <SocialIcon
          image={linkedInIcon}
          link="https://www.linkedin.com/in/georgi-gavrilenko"
          altText="LinkedIn icon."
        />
        <SocialIcon
          image={githubIcon}
          link="https://github.com/GavrilenkoGeorgi"
          altText="Github icon."
        />
      </div>
    </footer>
  );
};

export default Footer;
