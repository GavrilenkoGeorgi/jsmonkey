import type { NextPage } from "next";
import Head from "next/head";
import HeroSection from "../../components/layout/HeroSection";
import ProjectSection from "../../components/projects/ProjectSection";
import heroImg from "../../assets/images/projects-pattern.webp";

import { projectSectionProps } from "../../types";
import items from "../../data/projects.json";

import styles from "../../styles/Main.module.scss";

const Projects: NextPage<projectSectionProps> = () => {
  const itemsToShow = items.sort((a, b) => a.id - b.id);
  const title = "Projects list";
  const description = "List of things that I am working on.";
  const canonicalUrl = "https://jsmonkey.netlify.app/projects";
  const ogImageUrl =
    "https://jsmonkey.netlify.app/img/og/jsmonkey-projects-og-img.png";

  return (
    <div className={styles.container}>
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
        <meta
          property="og:image:alt"
          content="JSMonkey projects page pattern."
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="JSMonkey" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main className={styles.main}>
        <HeroSection heading="Projects" image={heroImg} />
        {itemsToShow.map((item, index) => (
          <ProjectSection
            key={item.id}
            project={item}
            animate={index > 0 ? true : false} // can't think of anything better right now (
          />
        ))}
      </main>
    </div>
  );
};

export default Projects;
