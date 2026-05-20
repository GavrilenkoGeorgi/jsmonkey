import { Noto_Sans } from "next/font/google";
import { FC } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import { ToastMsgContextProvider } from "../../context/toastMsgStore";
import { LayoutProps } from "../../types";
import Footer from "../layout/Footer";
import Navbar from "../navigation/NavBar";
import styles from "./Layout.module.sass";
import Toast from "./Toast";

const font = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const Layout: FC<LayoutProps> = ({ children }) => {
  // form on the main page uses context to set error messages
  // toast is a global component positioned on top of everything

  return (
    <div className={`${styles.layout} ${font.className}`}>
      <Navbar />
      <ToastMsgContextProvider>
        <ParallaxProvider>{children}</ParallaxProvider>
        <Toast />
      </ToastMsgContextProvider>
      <Footer />
    </div>
  );
};

export default Layout;
