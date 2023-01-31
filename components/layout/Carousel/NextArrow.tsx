import { MouseEventHandler } from 'react'
import Image from 'next/image'

import arrowRight from '../../../assets/icons/icon-arrow-right.svg'
import styles from './Arrows.module.sass'

const nextArrow = (clickHandler: MouseEventHandler<HTMLButtonElement>,
  hasPrev: boolean,
  label: string) => {
  return <div className={styles.rightArrowContainer}>
      <button
        onClick={clickHandler}
        className={styles.rightArrow}
      >
      <Image
        src={arrowRight}
        alt="Next slide arrow icon."
        width={125}
        height={125}
      />
    </button>
  </div>
}

export default nextArrow
