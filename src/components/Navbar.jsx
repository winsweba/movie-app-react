import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


export default function Navbar(props) {
  return (
    
    <div className='nave'>
        <div className='nav-title'>Movie shows</div>
        <div className='nave-list'>
        <Link className='nav-popular' to="/">Popular</Link>
        {/* <Link className='nav-popular' to="/popular">Popular </Link> */}
        <Link className='nav-tv' to="/tvshows">TV </Link>
        <Link className='nav-movie' to="/movies">Movie </Link>
        <Link className='search-btn' to="/search">Search</Link>
       
        </div>
    </div>
  )
}
