import { FC } from 'react'
import Image from 'next/image'

import { btnProps } from '../../types'
import styles from './Button.module.sass'
import submIcon from '../../assets/icons/icon-bars-fade.svg'

const Button:FC<btnProps> = (props) => {

  const { label, type, link, submitting } = props
  const btnType = type ? 'submit' : 'button'

  const handleOnClick = () => {
    if (link) window.location.href=link
    else return false //?
  }

  return <button type={btnType} className={styles.btn} onClick={handleOnClick}>
    {submitting
      ? <Image src={submIcon} alt='Submit indicator.' width={24} height={24}/>
      : label
    }
  </button>
}

export default Button
