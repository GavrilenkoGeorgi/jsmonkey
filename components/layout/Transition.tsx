import { FC } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { layoutProps } from '../../types'

const Transition:FC<layoutProps> = ({ children }) => {

  const { asPath } = useRouter()

  const variants = {
    inactive: {
      opacity: 1,
      y: 0,
      transition: {
        duration: .7,
        ease: 'easeIn'
      }
    },
    out: {
      opacity: 0,
      y: -100,
      transition: {
        duration: .7,
        ease: 'easeIn'
      }
    },
    in: {
      y: 100,
      opacity: 0,
      transition: {
        duration: .7,
        ease: 'easeIn'
      }
    }
  }

  return <div className='transition'>
    <AnimatePresence
      initial={false}
      mode='wait'
    >
      <motion.div
        key={asPath}
        variants={variants}
        initial="in"
        animate="inactive"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
}

export default Transition
