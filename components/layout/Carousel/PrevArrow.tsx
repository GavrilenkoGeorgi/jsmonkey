import { MouseEventHandler } from 'react'
import Image from 'next/image'

import arrowLeft from '../../../assets/icons/icon-arrow-left.svg'
import styles from './Arrows.module.sass'

const prevArrow = (clickHandler: MouseEventHandler<HTMLButtonElement>,
  hasPrev: boolean,
  label: string) => {
  return <div className={styles.leftArrowContainer}>
      <button
        onClick={clickHandler}
        className={styles.leftArrow}
      >
      <Image
        src={arrowLeft}
        alt="Previous slide arrow icon."
        width={125}
        height={125}
      />
    </button>
  </div>
}

export default prevArrow
