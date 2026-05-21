import { FC } from "react";

import { LayoutProps } from "../../types";
import Footer from "../layout/Footer";
import Navbar from "../navigation/NavBar";
import HashScroll from "./HashScroll";
import styles from "./Layout.module.sass";
import Toast from "./Toast";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <HashScroll />
      {children}
      <Toast />
      <Footer />
    </div>
  );
};

export default Layout;
