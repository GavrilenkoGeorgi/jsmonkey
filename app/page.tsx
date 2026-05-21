import clsx from "classnames";

import heroImg from "../assets/images/main-page-pattern.webp";
import ContactForm from "../components/forms/ContactForm";
import FadeIn from "../components/layout/Animation/FadeIn";
import HeroSection from "../components/layout/HeroSection";
import MainPageCTA from "../components/layout/MainPageCTA";
import MainSlider from "../components/layout/Slider/MainSlider";
import MainPageIntro from "../components/layout/Text/MainPageIntro";
import styles from "../styles/Main.module.sass";
import { buildMetadata } from "../utils/metadata";

export const metadata = buildMetadata({
  title: "Home page: jsmonkey.netlify.app",
  description: "Some more info about me and what I do.",
  siteUrl: "https://jsmonkey.netlify.app",
  canonicalPath: "https://jsmonkey.netlify.app",
  ogImageUrl: "https://jsmonkey.netlify.app/img/og/jsmonkey-og-img.png",
  ogImageAlt: "JSMonkey home page pattern.",
});

export default function Home() {
  return (
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
          <ContactForm />
        </FadeIn>
      </section>
    </main>
  );
}
