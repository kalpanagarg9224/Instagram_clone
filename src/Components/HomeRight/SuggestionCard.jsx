import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {followUserAction, unFollowUserAction} from '../../Redux/User/Action';
import defaultImage from "../../Images/userAvatar.png";


const SuggestionCard = ({ user }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
const reqUserState = useSelector(store => store.user);
    const reqUser = reqUserState.reqUser;
    const isFollowed = reqUser?.following?.some(
        (item) => item.id === user.id
    );
    const handleToggleFollow = () => {
        if(isFollowed){
            dispatch(
                unFollowUserAction({
                    jwt: token,
                    userId: user.id
                })
            );
        }
        else{
            dispatch(
                followUserAction({
                    jwt: token,
                    userId: user.id
                })
            );
        }
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
                <img
                    className='w-9 h-9 rounded-full'
                    src={user?.image || defaultImage }
                    alt=''
                />
                <div className='ml-2'>
                    <p className='text-sm font-semibold'>
                        {user?.username}
                    </p>
                    <p className='text-sm opacity-70'>
                        {user?.name}
                    </p>
                </div>
            </div>
            <button
                onClick={handleToggleFollow}
                className='text-blue-700 text-sm font-semibold'
            >
                {isFollowed ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default SuggestionCard;