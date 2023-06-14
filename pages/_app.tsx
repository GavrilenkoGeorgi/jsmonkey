import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import * as gtag from '../utils/gtag'
import Script from 'next/script'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import '../styles/globals.scss'
import Layout from '../components/layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <>
    <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-NHDRDGHWQ9'></Script>
    <Script
      id='google-analytics'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NHDRDGHWQ9', {
            page_path: window.location.pathname,
          });
        `
      }}
    />
     <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReCaptchaProvider>
  </>
}

export default MyApp
