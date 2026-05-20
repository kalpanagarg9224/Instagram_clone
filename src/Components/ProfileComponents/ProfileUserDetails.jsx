import React from 'react'
import { TbCircleDashed } from "react-icons/tb"
import { useNavigate } from 'react-router-dom'

export const ProfileUserDetails = ({
    user,
    isFollowing,
    isRequser,
    postCount
}) => {

    const navigate = useNavigate();

    return (

        <div className='py-10 w-full'>

            <div className='flex item-center'>

                <div className='w-[15%]'>

                    <img
                        className='w-32 h-32 rounded-full'
                        src={
                            user?.image ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7-ogoOaTH4Qxk9xEfPTPsY-w9AD4GRG_Cw&s"
                        }
                        alt=""
                    />

                </div>

                <div className='space-y-5'>

                    <div className='flex space-x-10 items-center'>

                        <p>{user?.username}</p>

                        {
                            isRequser ? (
                                <button
                                    onClick={() => navigate("/account/edit")}
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <button>
                                    {isFollowing ? "Following" : "Follow"}
                                </button>
                            )
                        }

                        <TbCircleDashed />

                    </div>

                    <div className='flex space-x-10 items-center'>

                        <div>
                            <span className='font-semibold mr-2'>
                                {postCount}
                            </span>
                            <span>posts</span>
                        </div>

                        <div>
                            <span className='font-semibold mr-2'>
                                {user?.follower?.length || 0}
                            </span>
                            <span>followers</span>
                        </div>

                        <div>
                            <span className='font-semibold mr-2'>
                                {user?.following?.length || 0}
                            </span>
                            <span>following</span>
                        </div>

                    </div>

                    <div>
                        <p className='font-semibold'>
                            {user?.name}
                        </p>

                        <p className='font-thin text-sm'>
                            {user?.bio}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProfileUserDetails;