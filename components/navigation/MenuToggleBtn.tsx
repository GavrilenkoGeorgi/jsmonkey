import { FC } from "react";

import { ToggleBtnProps } from "../../types";
import styles from "./MenuToggleBtn.module.sass";

export const MenuToggleBtn: FC<ToggleBtnProps> = ({ open }) => {
  return (
    <span className={`${styles.toggleIcon} ${open && styles.active}`}></span>
  );
};
