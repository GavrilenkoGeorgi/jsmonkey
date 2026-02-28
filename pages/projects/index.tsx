import type { NextPage } from "next";
import type { Metadata } from "next";

import { buildMetadata } from "../../utils/metadata";
import HeroSection from "../../components/layout/HeroSection";
import ProjectSection from "../../components/projects/ProjectSection";
import heroImg from "../../assets/images/projects-pattern.webp";

import { projectSectionProps } from "../../types";
import items from "../../data/projects.json";

import styles from "../../styles/Main.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Projects list",
    description: "List of things that I am working on.",
    canonicalPath: "https://jsmonkey.netlify.app/projects",
    ogImageUrl:
      "https://jsmonkey.netlify.app/img/og/jsmonkey-projects-og-img.png",
    ogImageAlt: "JSMonkey projects page pattern.",
  });
}

const Projects: NextPage<projectSectionProps> = () => {
  const itemsToShow = items.sort((a, b) => a.id - b.id);

  return (
    <div className={styles.container}>
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
