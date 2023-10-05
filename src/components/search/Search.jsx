import React from 'react'
import "./Search.scss"
import { BsSearch } from "react-icons/bs";



const Search = () => {
  return (
    <div className='search'>
      <BsSearch className='icon-search'/>
      <button>Search</button>
    </div>
  )
}

export default Search
