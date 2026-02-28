import type { NextPage } from "next";
import type { Metadata } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import { buildMetadata } from "../utils/metadata";
import HeroSection from "../components/layout/HeroSection";
import heroImg from "../assets/images/main-page-pattern.webp";
import MainSlider from "../components/layout/Slider/MainSlider";
import ContactForm from "../components/forms/ContactForm";
import MainPageIntro from "../components/layout/Text/MainPageIntro";
import MainPageCTA from "../components/layout/MainPageCTA";
import FadeIn from "../components/layout/Animation/FadeIn";

import styles from "../styles/Main.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Home page: jsmonkey.netlify.app",
    description: "Some more info about me and what I do.",
    canonicalPath: "https://jsmonkey.netlify.app",
    ogImageUrl: "https://jsmonkey.netlify.app/img/og/jsmonkey-og-img.png",
    ogImageAlt: "JSMonkey home page pattern.",
  });
}

const Home: NextPage = () => {
  return (
    <>
      <main className={styles.main}>
        <HeroSection heading="JSMonkey" image={heroImg} />
        <section className={styles.section}>
          <div className={styles.containerMd}>
            <MainPageIntro />
            <MainPageCTA />
          </div>
        </section>

        <section className={styles.section}>
          <FadeIn>
            <h2 className={styles.h2Header}>Featured Works</h2>
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
