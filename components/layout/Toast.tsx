import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import { Button } from "react-aria-components/Button";

import closeIcon from "../../assets/icons/icon-close.svg";
import { useToastMsgContext } from "../../context/toastMsgStore";
import styles from "./Toast.module.sass";

const Toast: FC = () => {
  const { toastMsg, setToastMsg } = useToastMsgContext();
  const closeToast = () =>
    setToastMsg({
      message: "",
      type: "",
    });

  const firstMsg = toastMsg;

  return (
    <div
      id={styles.toast}
      className={classNames({
        [styles.show]: firstMsg?.message,
        [styles[firstMsg.type]]: firstMsg?.type,
      })}
    >
      <div>{firstMsg.message || "Network error"}</div>
      <Button className={styles.iconContainer} onClick={closeToast}>
        <Image src={closeIcon} alt="Close icon." />
      </Button>
    </div>
  );
};

export default Toast;
