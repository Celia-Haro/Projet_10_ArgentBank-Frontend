import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navigation from './components/navigation/Navigation'

export default function App() {

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}
