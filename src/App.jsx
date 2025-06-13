import './App.css'
import {Routes, Route } from 'react-router'
import About from './pages/about/About'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import { Contact } from 'lucide-react'
import Mainlayout from './Mainlayout'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Mainlayout />} >
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
