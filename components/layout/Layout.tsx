import { FC } from 'react'
import Navbar from '../navigation/NavBar'
import Footer from '../layout/Footer'

import { layoutProps } from '../../types'
import styles from './Layout.module.sass'

const Layout:FC<layoutProps> = ({ children }) =>
  <div className={styles.layout}>
    <Navbar />
    {children}
    <Footer />
  </div>

export default Layout
