"use client";

import { FC } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import { ThemeProvider } from "../../context/ThemeContext";
import { ToastMsgContextProvider } from "../../context/toastMsgStore";
import { LayoutProps } from "../../types";
import Layout from "../layout/Layout";

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastMsgContextProvider>
        <ParallaxProvider>
          <Layout>{children}</Layout>
        </ParallaxProvider>
      </ToastMsgContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
