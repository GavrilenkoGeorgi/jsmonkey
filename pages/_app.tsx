import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import * as gtag from '../utils/gtag'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import '../styles/globals.scss'
import Layout from '../components/layout/Layout'

// page transitions
import PageTransition, { useAsPathWithoutHash } from '@madeinhaus/nextjs-page-transition'
import '@madeinhaus/nextjs-page-transition/dist/index.css'

function App({ Component, pageProps }: AppProps) {

  const key = useAsPathWithoutHash()
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
    <Layout>
      <PageTransition
        as='div'
        inPhaseDuration={700}
        outPhaseDuration={700}
      >
        <Component {...pageProps} key={key}/>
      </PageTransition>
    </Layout>
  </>
}

export default App
