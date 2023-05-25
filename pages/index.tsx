import type { NextPage } from 'next'

import NextSeoHead from '../components/layout/NextSeoHead'
import HeroSection from '../components/layout/HeroSection'
import heroImg from '../assets/images/main-page-pattern.webp'
import MainSlider from '../components/layout/Carousel/MainSlider'
import ContactForm from '../components/forms/ContactForm'
import MainPageCTA from '../components/layout/MainPageCTA'
import FadeIn from '../components/layout/Animation/FadeIn'

import styles from '../styles/Main.module.scss'

const Home: NextPage = () => {
  return <div className={styles.container}>
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
            <p className={styles.leadParagraph}>
              Hi, my name is George, and I am a Frontend Developer.
            </p>

            <p className={styles.pageParagraph}>
              Most of my experience is with Typescript, ECMAScript 6/ES2015,
              Next.js, React, Redux, Node.js, Express, MongoDB, Webpack 5,
              HTML5, CSS3, SASS/SCSS. I am testing using Jest and Cypress.
              My prior experience includes PHP7, MySQL and basic knowledge
              of C and Java.
              My English is Upper Intermediate (B2), I speak Ukrainian and Russian.
              Currently living in Kyiv, can relocate.
            </p>
            <MainPageCTA />
          </div>
        </section>

        <section className={styles.section}>
          <FadeIn>
            <h2 className={styles.h2Header}>Things I worked on</h2>
            <MainSlider />
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn>
            <ContactForm />
          </FadeIn>
        </section>
    </main>
  </div>
}

export default Home
