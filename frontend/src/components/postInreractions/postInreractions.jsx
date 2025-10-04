import React from 'react'
import Image from "../image/image"
import "./postInreractions.css"

const postInreractions = () => {
  return (
    <div className='postInteractions'>
      <div className="interactionIcons">
        <Image path='/general/react.svg'/>
        234
        <Image path="/general/share.svg"/>
        <Image path="/general/more.svg"/>
      </div>
      <button>Save</button>
    </div>

  )
}

export default postInreractions