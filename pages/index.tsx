import type { NextPage } from 'next'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import NextSeoHead from '../components/layout/NextSeoHead'
import HeroSection from '../components/layout/HeroSection'
import heroImg from '../assets/images/main-page-pattern.webp'
import MainSlider from '../components/layout/Slider/MainSlider'
import ContactForm from '../components/forms/ContactForm'
import MainPageIntro from '../components/layout/Text/MainPageIntro'
import MainPageCTA from '../components/layout/MainPageCTA'
import FadeIn from '../components/layout/Animation/FadeIn'

import styles from '../styles/Main.module.scss'

const Home: NextPage = () => {
  return <>
    <NextSeoHead
      title='Home page: jsmonkey.dev'
      description='Some more info about me and what I do.'
      canonical='https://jsmonkey.dev'
      openGraph={{
        url: 'https://jsmonkey.dev',
        title: 'Home page: jsmonkey.dev',
        description: 'Some more info about me and what I do.',
        images: [
          {
            url: 'https://jsmonkey.dev/img/og/jsmonkey-og-img.png',
            width: 1200,
            height: 630,
            alt: 'JSMonkey home page pattern.',
            type: 'image/png'
          }
        ],
        siteName: 'JSMonkey'
      }}
    />

    <main className={styles.main}>
      <HeroSection heading='JSMonkey.dev' image={heroImg} />
      <section className={styles.section}>
        <div className={styles.containerMd}>
          <MainPageIntro />
          <MainPageCTA />
        </div>
      </section>

      <section className={styles.section}>
        <FadeIn>
          <h2 className={styles.h2Header}>
            Featured Works
          </h2>
          <article className={styles.sliderContainer}>
            <MainSlider />
          </article>
        </FadeIn>
      </section>

      <section className={styles.section}>
        <FadeIn>
          <ReCaptchaProvider
            async
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          >
            <ContactForm />
          </ReCaptchaProvider>
        </FadeIn>
      </section>
    </main>
  </>
}

export default Home
