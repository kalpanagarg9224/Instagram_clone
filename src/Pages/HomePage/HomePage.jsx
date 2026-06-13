import React, { useEffect, useState } from 'react';
import StoryCircle from '../../Components/Story/StoryCircle';
import HomeRight from '../../Components/HomeRight/HomeRight';
import PostCard from '../../Components/Post/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { findUserPostAction } from '../../Redux/Post/Action';
import { getPopularUser } from '../../Redux/User/Action';
import { fetchFollowingStoryAction } from '../../Redux/Story/Action';
import { groupStoryByUser } from '../../Utils/storyUtils';
import AddStory from '../../Components/Story/AddStory';
import { createStoryAction } from '../../Redux/Story/Action';

const HomePage = () => {

    const [userIds, setUserIds] = useState();
    const token = localStorage.getItem("token");

    const { user, post } = useSelector(store => store);
    const { story } = useSelector(store => store);

    const [localStories, setLocalStories] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
  console.log("FETCHING STORIES");
  dispatch(fetchFollowingStoryAction(token));
}, [dispatch, token]);

    useEffect(() => {

        if (!user.reqUser) return;

        const newIds =
            user.reqUser.following?.map((u) => u.id) || [];

        setUserIds([user.reqUser.id, ...newIds]);

    }, [user.reqUser]);

    useEffect(() => {
  if (!userIds || userIds.length === 0) return;

  const data = {
    jwt: token,
    userIds: userIds.join(","),
  };

  dispatch(findUserPostAction(data));
  dispatch(getPopularUser(token));

}, [
  userIds,
  post.createdPost,
  post.deletedPost,
  dispatch,
  token,
]);

    useEffect(() => {

        setLocalStories(story.followingStories);

    }, [story.followingStories]);

    const groupedStories = groupStoryByUser(localStories);

    const handleAddStory = (imageUrl) => {

        const reqData = {

            token,

            storyData: {
                image: imageUrl,
                caption: ""
            }

        };

        dispatch(createStoryAction(reqData));

    };

    return (

        <div className="min-h-screen relative overflow-hidden text-white">

            {/* 🌈 BACKGROUND */}
            <div className="absolute inset-0 -z-10">

                <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl animate-pulse top-[-120px] left-[-120px]" />

                <div className="absolute w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-3xl animate-pulse bottom-[-120px] right-[-120px]" />

                <div className="absolute w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-2xl animate-bounce top-[35%] left-[40%]" />

            </div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/65 -z-10" />

            {/* MAIN CONTENT */}
            <div className='flex mt-10 w-full justify-center gap-8 px-6 relative'>

                {/* LEFT SECTION */}
                <div className='w-[45%]'>

                    {/* STORIES */}
                    <div
                        className='
                        relative overflow-hidden
                        flex space-x-4
                        rounded-[28px]
                        border border-white/10
                        bg-white/10
                        backdrop-blur-xl
                        p-5
                        justify-start
                        w-full
                        overflow-x-auto
                        shadow-2xl
                    '
                    >

                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />

                        <div className='relative flex space-x-4'>

                            <AddStory
                                onAddStory={handleAddStory}
                                currentUser={user.reqUser}
                            />

                            {groupedStories.map((userStories) => (

                                <StoryCircle
                                    key={userStories[0].user.id}
                                    stories={userStories}
                                />

                            ))}

                        </div>

                    </div>

                    {/* POSTS */}
                    <div className='space-y-8 w-full mt-8'>

                        {post.userPost.length > 0 &&
                            post.userPost.map((item) => (

                                <div
                                    key={item.id}
                                    className='
                                    rounded-[30px]
                                    border border-white/10
                                    bg-white/10
                                    backdrop-blur-xl
                                    p-2
                                    shadow-xl
                                    overflow-hidden
                                '
                                >

                                    <div className="absolute inset-0 bg-black/10" />

                                    <div className='relative'>
                                        <PostCard post={item} />
                                    </div>

                                </div>

                            ))}

                    </div>

                </div>

                {/* RIGHT SECTION */}
                    <div className='w-[37%]'>

                    <div
                        className='
                        sticky top-6
                        rounded-[30px]
                        border border-white/10
                        bg-white/10
                        backdrop-blur-xl
                        p-5
                        shadow-2xl
                        overflow-hidden
                    '
                    >

                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

                        <div className='relative'>
                            <HomeRight />
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default HomePage;