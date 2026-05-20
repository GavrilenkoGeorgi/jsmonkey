import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { SocialIconProps } from "../../types";
import * as gtag from "../../utils/gtag";
import styles from "./SocialIcon.module.sass";

const SocialIcon: FC<SocialIconProps> = (props) => {
  const { image, altText, link } = props;

  return (
    <Link
      href={link}
      className={styles.socialLink}
      onClick={() =>
        gtag.event({
          action: "social_link_click",
          category: "engagement",
          label: altText,
        })
      }
    >
      <Image src={image.src} alt={altText} width="24" height="24" />
    </Link>
  );
};

export default SocialIcon;
