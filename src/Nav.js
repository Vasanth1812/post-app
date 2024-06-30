import React from 'react'
import { Link } from 'react-router-dom'


const Nav = ({search,setsearch}) => {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="search">search posts</label>
          <input className='sear'
                 type="text"
                 id="search"
                 placeholder='search posts'
                 value={search}
                 onChange={(e)=>setsearch(e.target.value)}
         />
         <ul>
            <li> <Link to="">Home</Link></li>
            <li> <Link to="post">Post</Link></li>
            <li> <Link to="about">About</Link></li>
         </ul>

  

        </form>
    </nav>
  )
}

export default Nav