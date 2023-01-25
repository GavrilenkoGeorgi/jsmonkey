import type { NextPage } from 'next'

import Header from '../../components/layout/Header'
import HeroSection from '../../components/layout/HeroSection'
import ProjectSection from '../../components/projects/ProjectSection'
import heroImg from '../../assets/images/projects-pattern.webp'

import { projectSectionProps } from '../../types'
import items from '../../data/projects.json'

import styles from '../../styles/Main.module.scss'

const Projects: NextPage<projectSectionProps> = () => {
  return <div className={styles.container}>
      <Header title="Projects page" descr="List of completed projects.">
      </Header>
      <main className={styles.main}>
        <HeroSection heading="Projects" image={heroImg}/>
        <h2 className={styles.projectsHeading}>Projects</h2>
        {items.map((item) => (
          <ProjectSection key={item.id} project={item}/>
        ))}
      </main>
    </div>
}

export default Projects
