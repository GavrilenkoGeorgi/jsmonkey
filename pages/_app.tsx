import { Noto_Sans } from '@next/font/google'
import type { AppProps } from 'next/app'

import '../styles/globals.scss'
import Layout from '../components/layout/Layout'

const quicksand = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600']
})

function MyApp({ Component, pageProps }: AppProps) {
  return <div className={quicksand.className}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </div>
}

export default MyApp
