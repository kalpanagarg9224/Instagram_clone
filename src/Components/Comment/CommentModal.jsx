import {Modal, ModalBody, ModalOverlay, ModalContent,ModalHeader,ModalCloseButton} from '@chakra-ui/react';
import React from 'react'
import CommentCard from './CommentCard';
import { FaRegComment } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiSendPlaneLine } from 'react-icons/ri';
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs';
import "./CommentModal.css";


const CommentModal = ({onClose,isOpen, isSaved, isPostLiked, handlePostLike, handleSavePost}) => {
  return (
    <div>
        <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className='flex h-[75vh]'>
              <div className='w-[45%] flex flex-col justify-center'>
                <img className='max-h-full max-w-full' src="https://cdn.pixabay.com/photo/2022/10/23/09/48/lion-7540888_1280.jpg" alt=""/>
              </div>
              <div className='w-[55%] pl-10 relative'>
                <div className='flex justify-between items-center py-5'>
                  <div className='flex items-center'>
                  <div>
                    <img className='w-9 h-9 rounded-full' src="https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg" alt=""/>
                  </div>
                  <div className='ml-2'>
                    <p>username</p>
                  </div>
                </div>
                <BsThreeDots/>
                </div>
                <hr/>
                <div className='comment'>
                  {[1,1,1,1,1].map(()=> <CommentCard/>)}
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
                    <p>10 likes</p>
                    <p className='opacity-50 text-sm'>1 day ago</p>
                 </div>
                    <div className='flex items-center w-full'>
                      <BsEmojiSmile/>
                      <input className='commentInput' type="text" placeholder="Add a comment..."/>
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