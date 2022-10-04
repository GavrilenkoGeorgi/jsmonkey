import { FC, ReactNode} from 'react'
import Navbar from '../navigation/NavBar'
import Footer from '../layout/Footer'

type layoutProps = {
  children: ReactNode
}

const Layout:FC<layoutProps> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Layout
