import { Noto_Sans } from '@next/font/google'
import type { AppProps } from 'next/app'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import '../styles/globals.scss'
import Layout from '../components/layout/Layout'

const quicksand = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600']
})

function MyApp({ Component, pageProps }: AppProps) {
  return <div className={quicksand.className}>
     <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReCaptchaProvider>
  </div>
}

export default MyApp
