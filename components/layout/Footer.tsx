import Link from "next/link";
import { FC } from "react";

import githubIcon from "../../assets/icons/icon-github.svg";
import linkedInIcon from "../../assets/icons/icon-linked-in.svg";
import styles from "./Footer.module.sass";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";

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
