import React from 'react'
import Hero from '../../components/home/Hero'
import Support from '../../components/home/Support'
import Deals from '../../components/home/Deals'
import Blog from '../../components/home/Blog'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <Support />
      <Deals />
      <Blog />
    </div>
  )
}

export default Home
