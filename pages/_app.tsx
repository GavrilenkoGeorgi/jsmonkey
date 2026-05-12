import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Script from "next/script";
import * as gtag from "../utils/gtag";
import { ThemeProvider } from "../context/ThemeContext";

import "../styles/globals.scss";
import Layout from "../components/layout/Layout";
import Transition from "../components/layout/Transition";

function App({ Component, pageProps }: AppProps) {
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
      <Script
        id="netlify-manager"
        strategy="afterInteractive"
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      />
      <Script
        id="gtag-manager"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        id="netlify-ident"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on('init', user => {
                if (!user) {
                  window.netlifyIdentity.on('login', () => {
                    document.location.href = '/admin/';
                  });
                }
              });
            }
          `,
        }}
      />
      <ThemeProvider>
        <Layout>
          <Transition>
            <Component {...pageProps} />
          </Transition>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
