import React from 'react'
import {TbCircleDashed} from "react-icons/tb"

export const ProfileUserDetails = () => {
  return (
    <div className='py-10 w-full'>
        <div className='flex item-center'>
            <div className='w-[15%]'>
                <img className='w-32 h-32 rounded-full' src="https://cdn.pixabay.com/photo/2022/03/27/11/23/cat-7094808_1280.jpg" alt=""/>
            </div>
            <div className='space-y-5'>
                <div className='flex space-x-10 items-center'>
                    <p>username</p>
                    <button>Edit Profile</button>
                    <TbCircleDashed></TbCircleDashed>
                </div>
                <div className='flex space-x-10 items-center'>
                    <div>
                        <span className='font-semibold mr-2'>10</span>
                        <span>posts</span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2'>5</span>
                        <span>followers</span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2'>7</span>
                        <span>following</span>
                    </div>
                </div>
                <div>
                    <p className='font-semibold'>Full Name</p>
                    <p className='font-thin text-sm'>😋Foodiee...🍜 | Adding a touch of glam to every moment 🌈.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
 