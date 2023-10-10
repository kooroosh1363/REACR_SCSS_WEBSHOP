import React from 'react'
import "./Home.css"
import Navbar from '../../components/navbar/Navbar'
import Section from '../../components/section/Section'
import SecSection from '../../components/sec_section/SecSection'



const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Section/>
        <SecSection/>
      
    </div>
  )
}

export default Home
