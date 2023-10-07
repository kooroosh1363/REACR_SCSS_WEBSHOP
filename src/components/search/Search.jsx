import React from 'react'
import "./Search.scss"
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FcPaid } from "react-icons/fc";


const Search = () => {
  return (
    <>
      <div className='search'>
        <BsSearch className='icon_search' />
        <button className='btn_search'>Search</button>
      </div>

      <div className="btn_right">
        <button>
          <Link to="/login">Login In</Link>
        </button>

        <button>
          <Link to="/sign-up">Sign Up</Link>
        </button>

        <FcPaid className='shop_bascket'/>
      </div>
    </>

  )
}

export default Search
