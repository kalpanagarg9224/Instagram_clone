import React, {useEffect, useState} from 'react';
import {AiFillHeart , AiOutlineHeart} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { isCommentLikedByUser, timeDifference } from '../../Config/Logic';
import { likeCommentAction, unlikeCommentAction } from '../../Redux/Comment/Action';

const CommentCard = ({comment}) => {
    const [isCommentLike, setIsCommentLike] = useState(false);
    const dispatch= useDispatch();
    const token = localStorage.getItem("token");
    const {user} = useSelector(store=>store);
    const data = {
        commentId: comment.id,
        jwt: token
    }


    const handleLikeComment=()=>{
        setIsCommentLike(true)
        dispatch(likeCommentAction(data))
    }
    const handleUnlikeComment=()=>{
        setIsCommentLike(false)
        dispatch(unlikeCommentAction(data))
    }

    useEffect(()=>{
        setIsCommentLike(isCommentLikedByUser(comment, user.reqUser.id))
    },[user.reqUser, comment])

  return (
    <div>
        <div className='flex items-center justify-between py-5'>
            <div className='flex items-center'>
                <div>
                    <img className='w-9 h-9 rounded-full' src={comment.user.userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7-ogoOaTH4Qxk9xEfPTPsY-w9AD4GRG_Cw&s"} alt="" />
                </div>
                <div className='ml-3'>
                    <p>
                        <span className='fond-semibold'>{comment.user.username}</span>
                        <span className='ml-2'>{comment.content}</span>
                    </p>
                    <div className='flex items-center space-x-3 text-xs opacity-60 pt-2'>
                        <span>{timeDifference(comment?.createdAt)}</span>
                        {comment?.likedByUsers?.length>0 && <span>{comment?.likedByUsers?.length} likes</span>}
                        <span></span>
                    </div>
                </div>
            </div>
            {isCommentLike ? (<AiFillHeart onClick={handleUnlikeComment} className='text-xs hover:opacity-50 cursor-pointer text-red-600'/>) : (<AiOutlineHeart onClick={handleLikeComment} className='text-xs hover:opacity-50 cursor-pointer'/>)}
        </div>
    </div>
  );
};

export default CommentCard;