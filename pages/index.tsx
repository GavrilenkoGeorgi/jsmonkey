import type { NextPage } from 'next'
import Head from 'next/head'

import HeroSection from '../components/layout/HeroSection'
import heroImg from '../assets/images/main-page-pattern.webp'
import Carousel from '../components/layout/Carousel/Carousel'
import ContactForm from '../components/forms/ContactForm'
import MainPageCTA from '../components/layout/MainPageCTA'

import styles from '../styles/Main.module.scss'

const Home: NextPage = () => {
  return <div className={styles.container}>
    <Head>
      <title>JSMonkey.dev</title>
      <meta name="description" content="My resume, projects, blog." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <HeroSection heading='JSMonkey.dev' image={heroImg} />
        <section className={styles.containerLg}>
          <p className={styles.leadParagraph}>
            Hi, my name is George and I am working as a full-time Middle Frontend Developer.
          </p>

          <p className={styles.pageParagraph}>
            Most of my experience is with ECMAScript 6/ES2015, Next.js, React, Redux, Node.js, Express, MongoDB, Webpack 5,
            HTML5, CSS3, SASS/SCSS. I am testing using Jest and Cypress. My prior experience includes PHP7, MySQL and
            a basic knowledge of C and Java.
            My English is Upper Intermediate (B2), I speak Ukrainian and Russian languages.
            Currently living in Kyiv, can relocate.
          </p>
          <MainPageCTA />
        </section>

        <section className={styles.section}>
          <Carousel />
        </section>

        <section className={styles.section}>
          <ContactForm />
        </section>
    </main>
  </div>
}

export default Home
