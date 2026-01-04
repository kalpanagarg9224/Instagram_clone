import React from 'react'
import {useNavigate} from 'react-router-dom'

const StoryCircle = () => {
  const navigate = useNavigate();
  const handleNavigate=()=>{
    navigate("/story/")
  }
  return (
    <div onClick={handleNavigate} className='cursor-pointer flex flex-col item-center'>
        <img className='h-16 w-16 rounded-full' src="https://cdn.pixabay.com/photo/2014/04/10/11/24/rose-320868_1280.jpg" alt=""/>
        <p>username</p>
    </div>
  )
}

export default StoryCircle