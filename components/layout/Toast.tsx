import { FC } from 'react'
import { useToastMsgContext } from '../../context/toastMsgStore'
import Image from 'next/image'

import closeIcon from '../../assets/icons/icon-close.svg'
import styles from './Toast.module.sass'

const Toast: FC = () => {

  const { toastMsg, setToastMsg } = useToastMsgContext()
  const closeToast = () => setToastMsg({
    message: '',
    type: ''
  })

  const firstMsg = toastMsg

  return <div
    id={styles.toast}
    className={firstMsg?.message && `${styles.show} ${styles[firstMsg.type]}` }
  >
    <div>
      {firstMsg.message || 'Network error'}
    </div>
    <div
      className={styles.iconContainer}
      onClick={closeToast}
    >
      <Image src={closeIcon} alt="Close icon." />
    </div>
  </div>
}

export default Toast
