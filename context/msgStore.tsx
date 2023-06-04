import { createContext, useContext, useState } from 'react'
import { FC } from 'react'
import { layoutProps } from '../types'

import { MsgDataType, MsgContextProps } from '../types'

const MsgContext = createContext<MsgContextProps>({
  errorMsg: '',
  setErrorMsg: (): string => '',
  data: [],
  setData: (): MsgDataType[] => []
})

export const MsgContextProvider:FC<layoutProps> = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [data, setData] = useState<[] | MsgDataType[]>([])

  return (
    <MsgContext.Provider
      value={{ errorMsg, setErrorMsg, data, setData }}
    >
      {children}
    </MsgContext.Provider>
  )
}

export const useMsgContext = () => useContext(MsgContext)
