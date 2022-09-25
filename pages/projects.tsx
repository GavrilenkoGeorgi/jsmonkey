import type { NextPage } from 'next'
import Header from '../components/layout/Header'
import styles from '../styles/Main.module.scss'

const Projects: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header title="Projects page" descr="List of completed projects.">
      </Header>
      <main className={styles.main}>
      <h1>Projects</h1>
      </main>
    </div>
  )
}

export default Projects
