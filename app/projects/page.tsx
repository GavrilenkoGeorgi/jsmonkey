import fs from "fs";
import path from "path";

import heroImg from "../../assets/images/projects-pattern.webp";
import HeroSection from "../../components/layout/HeroSection";
import ProjectSection from "../../components/projects/ProjectSection";
import projectsData from "../../data/projects.json";
import styles from "../../styles/Main.module.sass";
import { ProjectSectionProps } from "../../types";
import { buildMetadata } from "../../utils/metadata";

type ProjectItem = ProjectSectionProps["project"];

export const metadata = buildMetadata({
  title: "Projects list",
  description: "List of things that I am working on.",
  siteUrl: "https://jsmonkey.netlify.app",
  canonicalPath: "https://jsmonkey.netlify.app/projects",
  ogImageUrl:
    "https://jsmonkey.netlify.app/img/og/jsmonkey-projects-og-img.png",
  ogImageAlt: "JSMonkey projects page pattern.",
});

export default function Projects() {
  const contentDir = path.join(process.cwd(), "content", "projects");

  const projects: ProjectItem[] = [...projectsData]
    .sort((a, b) => a.id - b.id) // id controls display order of the projects
    .map((item) => {
      const filePath = path.join(contentDir, `${item.slug}.md`);
      const description = fs.readFileSync(filePath, "utf-8");
      return { ...item, description };
    });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HeroSection heading="Projects" image={heroImg} />
        {projects.map((item, index) => (
          <ProjectSection key={item.id} project={item} animate={index > 0} />
        ))}
      </main>
    </div>
  );
}
