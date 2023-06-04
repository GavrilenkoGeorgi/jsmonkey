import { FC, createContext, useContext, useState } from 'react'
import { layoutProps, ToastMsgDataType, ToastMsgContextProps } from '../types'

const initialToastMsg = {
  message: '',
  type: ''
}

const ToastMsgContext = createContext<ToastMsgContextProps>({
  toastMsg: initialToastMsg,
  setToastMsg: (): ToastMsgDataType => initialToastMsg
})

export const ToastMsgContextProvider:FC<layoutProps> = ({ children }) => {
  const [toastMsg, setToastMsg] = useState<ToastMsgDataType>(initialToastMsg)

  return <ToastMsgContext.Provider
    value={{ toastMsg, setToastMsg }}
  >
    {children}
  </ToastMsgContext.Provider>
}

export const useToastMsgContext = () => useContext(ToastMsgContext)
