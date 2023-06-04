import { FC } from 'react'
import { useMsgContext } from '../../context/msgStore'

import styles from './Toast.module.sass'

const Toast: FC = () => {

  const { errorMsg, setErrorMsg } = useMsgContext()
  const closeToast = () => setErrorMsg('')

  return <div
    id={styles.toast}
    className={errorMsg && styles.show}
    onClick={closeToast}
  >
    {errorMsg}
  </div>
}

export default Toast
