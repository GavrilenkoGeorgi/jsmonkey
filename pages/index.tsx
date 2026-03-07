import type { NextPage } from "next";
import Head from "next/head";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import HeroSection from "../components/layout/HeroSection";
import heroImg from "../assets/images/main-page-pattern.webp";
import MainSlider from "../components/layout/Slider/MainSlider";
import ContactForm from "../components/forms/ContactForm";
import MainPageIntro from "../components/layout/Text/MainPageIntro";
import MainPageCTA from "../components/layout/MainPageCTA";
import FadeIn from "../components/layout/Animation/FadeIn";
import clsx from "classnames";

import styles from "../styles/Main.module.scss";

const Home: NextPage = () => {
  const title = "Home page: jsmonkey.netlify.app";
  const description = "Some more info about me and what I do.";
  const canonicalUrl = "https://jsmonkey.netlify.app";
  const ogImageUrl = "https://jsmonkey.netlify.app/img/og/jsmonkey-og-img.png";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="JSMonkey home page pattern." />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="JSMonkey" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main className={styles.main}>
        <HeroSection heading="JSMonkey" image={heroImg} />
        <section className={styles.section}>
          <div className={styles.containerMd}>
            <MainPageIntro />
            <MainPageCTA />
          </div>
        </section>

        <section className={clsx(styles.section, styles.sliderSection)}>
          <FadeIn>
            <h2 className={styles.h2Header}>Things I&apos;ve done</h2>
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
  );
};

export default Home;
