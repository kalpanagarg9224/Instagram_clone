
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from "react-icons/fa";

const ReqUserPostCard = ({post}) => {

  return (
    <div className='p-2'>
        <div className='post w-60 h-60'>
            
            <img
                className='cursor-pointer w-full h-full object-cover'
                src={post?.image}
                alt=""
            />

            <div className='overlay'>
                <div className='overlay-text flex justify-between'>

                    <div className='flex items-center gap-1'>
                        <AiFillHeart/>
                        <span>{post?.likedByUsers?.length || 0}</span>
                    </div>

                    <div className='flex items-center gap-1'>
                        <FaComment/>
                        <span>{post?.comments?.length || 0}</span>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default ReqUserPostCard;