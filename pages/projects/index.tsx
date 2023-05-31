import type { NextPage } from 'next'

import NextSeoHead from '../../components/layout/NextSeoHead'
import HeroSection from '../../components/layout/HeroSection'
import ProjectSection from '../../components/projects/ProjectSection'
import heroImg from '../../assets/images/projects-pattern.webp'

import { projectSectionProps } from '../../types'
import items from '../../data/projects.json'

import styles from '../../styles/Main.module.scss'

const Projects: NextPage<projectSectionProps> = () => {
  return <div className={styles.container}>
    <NextSeoHead
      title='Projects list'
      description='List of things that I am working on.'
      canonical='https://jsmonkey.dev/projects'
      openGraph={{
        url: 'https://jsmonkey.dev/projects',
        title: 'Projects list',
        description: 'List of things that I am working on.',
        images: [
          {
            url: 'https://jsmonkey.dev/img/og/jsmonkey-projects-og-img.png',
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
      <HeroSection heading="Projects" image={heroImg}/>
      {items.map((item) => (
        <ProjectSection key={item.id} project={item}/>
      ))}
    </main>
  </div>
}

export default Projects
