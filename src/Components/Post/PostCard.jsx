import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from 'react-icons/bs';

import "./PostCard.css";

import {
  AiFillHeart,
  AiOutlineHeart
} from 'react-icons/ai';

import { FaRegComment } from 'react-icons/fa';

import { RiSendPlaneLine } from 'react-icons/ri';

import CommentModal from '../Comment/CommentModal';

import { useDispatch, useSelector } from 'react-redux';

import {
  likePostAction,
  savePostAction,
  unlikePostAction,
  unsavePostAction,
  deletePostAction
} from '../../Redux/Post/Action';

import { createCommentAction } from '../../Redux/Comment/Action';

import {
  isPostLikedByUser,
  isSavedPost
} from '../../Config/Logic';

import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {

  const [showDropDown, setShowDropDown] = useState(false);

  const [isPostLiked, setIsPostLiked] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(
  post?.likedByUsers?.length || 0
);

const [commentCount, setCommentCount] = useState(
  post?.comments?.length || 0
);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const user = useSelector(store => store.user);

  const navigate = useNavigate();

  const data = {
    jwt: token,
    postId: post?.id
  };

  /* ---------------- LIKE ---------------- */

  const handlePostLike = () => {

  setIsPostLiked(true);

  setLikeCount((prev) => prev + 1);

  dispatch(likePostAction(data));

};

  const handlePostUnlike = () => {

  setIsPostLiked(false);

  setLikeCount((prev) => Math.max(prev - 1, 0));

  dispatch(unlikePostAction(data));

};

  /* ---------------- SAVE ---------------- */

  const handleSavePost = () => {

    setIsSaved(true);

    dispatch(savePostAction(data));

  };

  const handleUnsavePost = () => {

    setIsSaved(false);

    dispatch(unsavePostAction(data));

  };

  /* ---------------- DROPDOWN ---------------- */

  const handleClick = () => {

    setShowDropDown(!showDropDown);

  };

  /* ---------------- DELETE ---------------- */

  const handleDeletePost = () => {

    const data = {
      jwt: token,
      postId: post.id
    };

    dispatch(deletePostAction(data));

  };

  /* ---------------- OPEN COMMENTS ---------------- */

  const handleOpenCommentModal = () => {

    navigate(`/comment/${post.id}`);

    onOpen();

  };

  /* ---------------- CREATE COMMENT ---------------- */

  const handleCreateComment = () => {

  if (!comment.trim()) return;

  const reqData = {

    jwt: token,

    postId: post.id,

    data: {
      content: comment
    }

  };

  dispatch(createCommentAction(reqData));

  setCommentCount((prev) => prev + 1);

  setComment("");

};

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {

  setIsPostLiked(
    isPostLikedByUser(post, user.reqUser?.id)
  );

  setIsSaved(
    isSavedPost(user.reqUser, post.id)
  );

  setLikeCount(
    post?.likedByUsers?.length || 0
  );

  setCommentCount(
    post?.comments?.length || 0
  );

}, [post, user?.reqUser]);

  return (

    <div
      className='
      overflow-hidden
      rounded-[28px]
      border border-white/10
      bg-black/20
      backdrop-blur-xl
      text-white
      shadow-2xl
    '
    >

      {/* HEADER */}
      <div className='flex justify-between items-center w-full px-5 py-4'>

        <div className='flex items-center'>

          <img
            className='
            h-12
            w-12
            rounded-full
            object-cover
            border border-white/20
          '
            src={
              post?.user.userImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7-ogoOaTH4Qxk9xEfPTPsY-w9AD4GRG_Cw&s"
            }
            alt=""
          />

          <div className='pl-3'>

            <p className='font-semibold text-sm text-white'>
              {post?.user.username}
            </p>

            <p className='text-xs text-gray-400'>
              {post.location}
            </p>

          </div>

        </div>

        {/* DROPDOWN */}
        <div className='relative'>

          <BsThreeDots
            className='text-lg cursor-pointer hover:opacity-70'
            onClick={handleClick}
          />

          {showDropDown &&
            post?.user?.id === user?.reqUser?.id && (

              <div
                className='
                absolute
                right-0
                top-8
                z-50
                rounded-xl
                bg-black/90
                border border-white/10
                overflow-hidden
                shadow-xl
              '
              >

                <p
                  onClick={handleDeletePost}
                  className='
                  px-5
                  py-2
                  text-sm
                  cursor-pointer
                  hover:bg-red-500
                  transition
                '
                >
                  Delete
                </p>

              </div>

            )}

        </div>

      </div>

      {/* POST IMAGE */}
      <div className='w-full flex justify-center bg-black/20'>

        <img
          className='
          w-full
          h-auto
          object-contain
        '
          src={post?.image}
          alt=""
        />

      </div>

      {/* ACTION BUTTONS */}
<div className='flex justify-between items-center px-5 py-4'>
  <div className='flex items-center space-x-5'>
    {/* LIKE */}
    <div className='flex items-center gap-1'>

      {isPostLiked ? (

        <AiFillHeart
          className='
          text-2xl
          cursor-pointer
          text-red-500
          hover:scale-110
          transition
        '
          onClick={handlePostUnlike}
        />

      ) : (

        <AiOutlineHeart
          className='
          text-2xl
          cursor-pointer
          hover:scale-110
          transition
        '
          onClick={handlePostLike}
        />

      )}

      {likeCount > 0 && (

        <span className='text-sm text-gray-200 font-medium'>
          {likeCount}
        </span>

      )}

    </div>

    {/* COMMENT */}
    <div
      onClick={handleOpenCommentModal}
      className='
      flex items-center gap-1
      cursor-pointer
    '
    >

      <FaRegComment
        className='
        text-xl
        hover:scale-110
        transition
      '
      />

      {commentCount > 0 && (

        <span className='text-sm text-gray-200 font-medium'>
          {commentCount}
        </span>

      )}

    </div>

    {/* SHARE */}
    <RiSendPlaneLine
      className='
      text-xl
      cursor-pointer
      hover:scale-110
      transition
    '
    />

  </div>

  {/* SAVE */}
  <div>

    {isSaved ? (

      <BsBookmarkFill
        className='
        text-xl
        cursor-pointer
        hover:scale-110
        transition
      '
        onClick={handleUnsavePost}
      />

    ) : (

      <BsBookmark
        className='
        text-xl
        cursor-pointer
        hover:scale-110
        transition
      '
        onClick={handleSavePost}
      />

    )}

  </div>

</div>

      {/* LIKES + CAPTION */}
      <div className='px-5 pb-4'>

        {post?.caption && (

          <p className='text-sm text-gray-200 mt-2'>

            <span className='font-semibold text-white mr-2'>
              {post?.user.username}
            </span>

            {post.caption}

          </p>

        )}

        {post?.comments?.length > 0 && (

          <p
            onClick={handleOpenCommentModal}
            className='
            text-sm
            text-gray-400
            pt-2
            cursor-pointer
            hover:text-gray-200
            transition
          '
          >
            View all {commentCount} comments
          </p>

        )}

      </div>

      {/* COMMENT INPUT */}
      <div
        className='
        border-t border-white/10
        bg-black/30
        backdrop-blur-lg
      '
      >

        <div className='flex items-center gap-3 px-5 py-4'>

          <BsEmojiSmile
            className='
            text-gray-300
            text-lg
            shrink-0
          '
          />

          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                handleCreateComment();

              }

            }}
            className='
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-white
            placeholder:text-gray-500
          '
            type="text"
            placeholder="Add a comment..."
          />

          {comment.trim() && (

            <button
              onClick={handleCreateComment}
              className='
              text-sm
              font-semibold
              text-pink-400
              hover:text-pink-300
              transition
            '
            >
              Post
            </button>

          )}

        </div>

      </div>

      {/* COMMENT MODAL */}
      <CommentModal
        handlePostLike={handlePostLike}
        onClose={onClose}
        isOpen={isOpen}
        handleSavePost={handleSavePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
      />

    </div>

  );

};

export default PostCard;