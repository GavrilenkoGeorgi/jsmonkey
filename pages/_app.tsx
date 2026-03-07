import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import * as gtag from "../utils/gtag";
import { ThemeProvider } from "../context/ThemeContext";

import "../styles/globals.scss";
import Layout from "../components/layout/Layout";

// page transitions
import PageTransition, {
  useAsPathWithoutHash,
} from "@madeinhaus/nextjs-page-transition";
import "@madeinhaus/nextjs-page-transition/dist/index.css";

function App({ Component, pageProps }: AppProps) {
  const key = useAsPathWithoutHash();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <ThemeProvider>
        <Layout>
          <PageTransition as="div" inPhaseDuration={250} outPhaseDuration={250}>
            <Component {...pageProps} key={key} />
          </PageTransition>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
