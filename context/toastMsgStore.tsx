import { createContext, FC, useContext, useState } from "react";

import { LayoutProps, ToastMsgContextProps,ToastMsgDataType } from "../types";

const initialToastMsg = {
  message: "",
  type: "",
};

const ToastMsgContext = createContext<ToastMsgContextProps>({
  toastMsg: initialToastMsg,
  setToastMsg: (): ToastMsgDataType => initialToastMsg,
});

export const ToastMsgContextProvider: FC<LayoutProps> = ({ children }) => {
  const [toastMsg, setToastMsg] = useState<ToastMsgDataType>(initialToastMsg);

  return (
    <ToastMsgContext.Provider value={{ toastMsg, setToastMsg }}>
      {children}
    </ToastMsgContext.Provider>
  );
};

export const useToastMsgContext = () => useContext(ToastMsgContext);
