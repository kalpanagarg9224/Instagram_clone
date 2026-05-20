// import React from 'react'
// import {useNavigate} from 'react-router-dom'

// const StoryCircle = () => {
//   const navigate = useNavigate();
//   const handleNavigate=()=>{
//     navigate("/story/")
//   }
//   return (
//     <div onClick={handleNavigate} className='cursor-pointer flex flex-col item-center'>
//         <img className='h-16 w-16 rounded-full' src="https://cdn.pixabay.com/photo/2014/04/10/11/24/rose-320868_1280.jpg" alt=""/>
//         <p>username</p>
//     </div>
//   )
// }

// export default StoryCircle
import React from 'react'
import { useNavigate } from 'react-router-dom'

const StoryCircle = ({ stories }) => {

    const navigate = useNavigate();

    const firstStory = stories?.[0];

    if (!firstStory) return null;

    const handleNavigate = () => {

        navigate(`/story/${firstStory.user.id}`);

    }

    return (

        <div
            onClick={handleNavigate}
            className='cursor-pointer flex flex-col items-center'
        >

            <div className='p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600'>

                <img
                    className='h-16 w-16 rounded-full border-2 border-white object-cover'
                    src={firstStory.user.userImage}
                    alt=""
                />

            </div>

            <p className='text-sm mt-1'>
                {firstStory.user.username}
            </p>

        </div>
    )
}

export default StoryCircle;