import type { NextPage } from 'next'

import Header from '../../components/layout/Header'
import HeroSection from '../../components/pages/HeroSection'
import heroImg from '../../assets/images/projects-pattern.webp'

import styles from '../../styles/Main.module.scss'

const Projects: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header title="Projects page" descr="List of completed projects.">
      </Header>
      <main className={styles.main}>
        <HeroSection heading="Projects" image={heroImg}/>
        <h1>Projects</h1>
      </main>
    </div>
  )
}

export default Projects
