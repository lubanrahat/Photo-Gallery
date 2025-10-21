import React from 'react'
import "./topBar.css"
import UserButton from '../userButton/userButton'
import Image from '../image/image'
import { useNavigate } from 'react-router'

const topBar = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${e.target[0].value}`)
  }
  return (
    <div className='topBar'>
      {/* {SEARTCH} */}
      <form onSubmit={handleSubmit} className="search">
        <Image path="/general/search.svg" alt="" />
        <input type="text" placeholder='Search'/>
      </form>
      {/* {USER} */}
      <UserButton/>
    </div>
  )
}

export default topBar