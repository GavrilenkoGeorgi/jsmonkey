import { FC } from 'react'

import ProjectCarousel from '../layout/Carousel/ProjectCarousel'
import { projectSectionProps } from '../../types'

import styles from './ProjectSection.module.sass'

const ProjectSection:FC<projectSectionProps> = ({ project }) => {

  const { title, description, images } = project

  return <section className={styles.container}>

    <aside className={styles.carousel}>
      <ProjectCarousel images={images}/>
    </aside>

    <div className={styles.descr}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.logos}>
        List of svg logos
      </div>
    </div>

  </section>
}

export default ProjectSection
