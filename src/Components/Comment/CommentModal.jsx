import {Modal, ModalBody, ModalOverlay, ModalContent,} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard';
import { FaRegComment } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiSendPlaneLine } from 'react-icons/ri';
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs';
import "./CommentModal.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCommentAction } from "../../Redux/Comment/Action"
import { findPostByIdAction } from '../../Redux/Post/Action';
import { timeDifference } from '../../Config/Logic';


const CommentModal = ({onClose,isOpen, isSaved, isPostLiked, handlePostLike, handleSavePost}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const {postId} = useParams();
  const {comment} = useSelector(store=>store);
const user = useSelector(store => store.user);
  const post = useSelector((state) => state.post);


  // console.log("post  ", post);

  useEffect(()=>{
    const data = {jwt:token, postId:postId}
    if(postId){
    dispatch(findPostByIdAction(data));
    }
  },[comment.createdComment, postId]);

  return (
    <div>
        <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent> 
          <ModalBody>
            <div className='flex h-[75vh]'>
              <div className='w-[45%] flex flex-col justify-center'>
                <img className='max-h-full max-w-full' src={post.singlePost?.image} alt=""/> 
              </div>
              <div className='w-[55%] pl-10 relative'>
                <div className='flex justify-between items-center py-5'>
                  <div className='flex items-center'>
                  <div>
                    <img className='w-9 h-9 rounded-full' src={user.reqUser.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7-ogoOaTH4Qxk9xEfPTPsY-w9AD4GRG_Cw&s"} alt=""/>
                  </div>
                  <div className='ml-2'>
                    <p>{user.reqUser.username}</p>
                  </div>
                </div>
                <BsThreeDots/>
                </div>
                <hr/>
                <div className='comment'>
                  {post.singlePost?.comments?.map((item)=> <CommentCard comment={item}/>)}
                </div>
               <div className='absolute bottom-0 w-[90%]'>
                 <div className='flex justify-between items-center w-full py-1'>
                  <div className='flex items-center space-x-2'>
                    {isPostLiked ? <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostLike}/> : <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike}/>}
                    <FaRegComment className='text-xl hover:opacity-50 cursor-pointer'/>
                    <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'/>
                  </div>
                  <div>
                    {isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSavePost}/> : <BsBookmark className='text-xl hover:opacity-50 cursor-pointer'  onClick={handleSavePost}/>}
                  </div>
                </div>
                 <div className='w-full py-2'>
                    {post.singlePost?.likedByUsers.length>0 && <p>{post.singlePost?.likedByUsers.length} likes</p>}
                    <p className='opacity-50 text-sm'>{timeDifference(post.singlePost?.createdAt)}</p>
                 </div>
                    <div className='flex items-center w-full'>
                      <BsEmojiSmile/>
                      <input className='commentInput' type="text" placeholder="Add a comment..." 
                      onChange={(e)=>setCommentContent(e.target.value)} 
                      value={commentContent}
                      onKeyPress={(e)=>{
                        if(e.key==="Enter"){
                          const data={
                            postId, 
                            jwt:token, 
                            data: {
                              content: commentContent,
                            }
                          };
                          dispatch(createCommentAction(data));
                          setCommentContent("")
                        }
                      }}/>
                    </div>
               </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CommentModal;