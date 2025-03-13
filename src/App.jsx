import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navigation from './components/navigation/Navigation'
import "./App.css"

export default function App() {

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}
