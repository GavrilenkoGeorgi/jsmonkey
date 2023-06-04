import { FC } from 'react'
import { useToastMsgContext } from '../../context/toastMsgStore'

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
    onClick={closeToast}
  >
    {firstMsg?.message}
  </div>
}

export default Toast
