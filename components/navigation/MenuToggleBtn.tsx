import { FC } from 'react'

import { ToggleBtnProps } from '../../types'
import styles from './MenuToggleBtn.module.sass'

export const MenuToggleBtn:FC<ToggleBtnProps> = ({ open }) => {
  return <button
    className={styles.button}
    >
      <span className={`${styles.toggleIcon} ${ open? styles.active : null }`}>
      </span>
    </button>
}
