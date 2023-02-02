import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import HeroSection from '../components/layout/HeroSection'
import heroImg from '../assets/images/main-page-pattern.webp'
import Carousel from '../components/layout/Carousel/Carousel'
import downloadIcon from '../assets/icons/icon-download.svg'
import githubIcon from '../public/img/logos/github.svg'

import styles from '../styles/Main.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
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
              Most of my experience is with ECMAScript 6/ES2015, React, Redux, Node.js, Express, MongoDB, Webpack 4, HTML5, CSS3, SASS/SCSS. I am testing using Jest and Cypress. My prior experience includes PHP7, MySQL and a basic knowledge of C and Java.
              My English is Upper Intermediate (B2), I speak Ukrainian and Russian language. Currently living in Kyiv, can relocate.
            </p>

            <div className={styles.downloadResumeCTA}>
              <Link href="/public/pdf/gavrylenkoCV.pdf">
                My resume in pdf
                <Image
                  src={downloadIcon}
                  alt="Download icon"
                  width={75}
                  height={75}
                  />
              </Link>
              <Link href="https://github.com/GavrilenkoGeorgi">
                Github account
                <Image
                  src={githubIcon}
                  alt="Github icon"
                  width={60}
                  height={60}
                  />
              </Link>
            </div>

          </section>

          <section className={styles.section}>
            {/* <h2 className={styles.heading}>Some of my work</h2> */}
            <Carousel />
          </section>

        {/* <div className={styles.grid}>
        </div> */}
      </main>

    </div>
  )
}

export default Home
