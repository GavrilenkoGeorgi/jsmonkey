import { FC } from 'react'
import Navbar from '../navigation/NavBar'
import Footer from '../layout/Footer'

import { layoutProps } from '../../types'

const Layout:FC<layoutProps> = ({ children }) =>
  <>
    <Navbar />
    {children}
    <Footer />
  </>

export default Layout
