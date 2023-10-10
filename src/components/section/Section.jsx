import React from 'react'
import "./Section.scss";
import { Typewriter } from 'react-simple-typewriter'


const Section = () => {
  return (
    <section className='section'>
        <div className="content">
            <h2><span><Typewriter words={['Be Excellent And HandSome with']}
                loop
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000} /></span>
                </h2>
                <h1><span>
                <Typewriter words={[ 'RAAD SHOP']}
                loop
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000} />
                  </span></h1>
            <button>BUY NOW</button>
            <button>RESERVE</button>
        </div>

        <div className="text_btn">
            <p>10% Lorem ipsum dolor sit amet.</p>
        </div>
      
    </section>
  )
}

export default Section
