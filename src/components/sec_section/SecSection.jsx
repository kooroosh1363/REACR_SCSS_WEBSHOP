import React from 'react'
import "./SecSection.scss";
import dress1 from "../../assets/image/1.png";
import dress2 from "../../assets/image/2.png";
import dress3 from "../../assets/image/3.png";
import dress4 from "../../assets/image/4.png";




const SecSection = () => {
  return (
    <>
    <section className='sec_section'>
        <div className="carts">
            <div className="cart">
                <img src={dress1} alt="dress1" />
                <p>Men</p>
                <h1>Lorem ipsum dolor sit.</h1>
            </div>

            <div className="cart">
                <img src={dress2} alt="dress2" />
                <p>Women</p>
                <h1>Lorem ipsum dolor sit.</h1>
            </div>

            <div className="cart">
                <img src={dress3} alt="dress3" />
                <p>Men</p>
                <h1>Lorem ipsum dolor sit.</h1>
            </div>

            <div className="cart">
                <img src={dress4} alt="dress4" />
                <p>Men</p>
                <h1>Lorem ipsum dolor sit.</h1>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default SecSection
