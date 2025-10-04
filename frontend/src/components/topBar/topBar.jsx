import React from 'react'
import "./topBar.css"
import UserButton from '../userButton/userButton'
import Image from '../image/image'

const topBar = () => {
  return (
    <div className='topBar'>
      {/* {SEARTCH} */}
      <div className="search">
        <Image path="/general/search.svg" alt="" />
        <input type="text" placeholder='Search'/>
      </div>
      {/* {USER} */}
      <UserButton/>
    </div>
  )
}

export default topBar