import { FC } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { layoutProps } from '../../types'

const Transition:FC<layoutProps> = ({ children }) => {

  const { asPath } = useRouter()

  const variants = {
    out: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.75
      }
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.5
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
        animate='in'
        initial='out'
        exit='out'
        layout='preserve-aspect'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
}

export default Transition
