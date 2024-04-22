import type { NextPage } from 'next'

import NextSeoHead from '../../components/layout/NextSeoHead'
import HeroSection from '../../components/layout/HeroSection'
import ProjectSection from '../../components/projects/ProjectSection'
import heroImg from '../../assets/images/projects-pattern.webp'

import { projectSectionProps } from '../../types'
import items from '../../data/projects.json'

import styles from '../../styles/Main.module.scss'

const Projects: NextPage<projectSectionProps> = () => {

  const itemsToShow = items.sort((a, b) => a.id - b.id)

  return <div className={styles.container}>
    <NextSeoHead
      title='Projects list'
      description='List of things that I am working on.'
      canonical='https://jsmonkey.netlify.app/projects'
      openGraph={{
        url: 'https://jsmonkey.netlify.app/projects',
        title: 'Projects list',
        description: 'List of things that I am working on.',
        images: [
          {
            url: 'https://jsmonkey.netlify.app/img/og/jsmonkey-projects-og-img.png',
            width: 1200,
            height: 630,
            alt: 'JSMonkey projects page pattern.',
            type: 'image/png'
          }
        ],
        siteName: 'JSMonkey'
      }}
    />
    <main className={styles.main}>
      <HeroSection heading='Projects' image={heroImg}/>
      {itemsToShow.map((item, index) => (
        <ProjectSection
          key={item.id}
          project={item}
          animate={index > 0 ? true : false} // can't think of anything better right now (
        />
      ))}
    </main>
  </div>
}

export default Projects
