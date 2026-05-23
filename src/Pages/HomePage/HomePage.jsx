import React, { useEffect, useState } from 'react';
import StoryCircle from '../../Components/Story/StoryCircle';
import HomeRight from '../../Components/HomeRight/HomeRight';
import PostCard from '../../Components/Post/PostCard';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { findUserPostAction } from '../../Redux/Post/Action';
import { getPopularUser } from '../../Redux/User/Action';
import { fetchFollowingStoryAction } from '../../Redux/Story/Action';
import { groupStoryByUser } from '../../Utils/storyUtils';

const HomePage = () => {
    const{isOpen, onOpen, onClose} = useDisclosure();
    const [userIds, setUserIds] = useState();
    const token = localStorage.getItem("token");
    const {user, post} = useSelector(store => store);
    const {story} = useSelector(store=>store);
    const groupedStories = groupStoryByUser(story.followingStories);

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("FETCHING STORIES");
    dispatch(fetchFollowingStoryAction(token));

},[])


  useEffect(() => {
  if (!user.reqUser) return;
  const newIds = user.reqUser.following?.map((u) => u.id) || [];
  setUserIds([user.reqUser.id, ...newIds]);
}, [user.reqUser]);

  useEffect(() => {
  if (!userIds || userIds.length === 0) return;
  const data = {
    jwt: token,
    userIds: userIds.join(",")
  };
  dispatch(findUserPostAction(data));
  dispatch(getPopularUser(token))
}, [userIds, post.createdPost, post.deletedPost]);


    return(
        <div>
            <div className='flex mt-10 w-[100%] justify-center'>
                <div className='w-[44%] px-10'>
                    {/* {<div className='StoryDiv flex space-x-2 border p-4 rounded-md justify-start w-full'>
                        {story.followingStories.map((item)=>(<StoryCircle key={item.id} story={item}/>))}
                    </div> } */}
                    <div className='StoryDiv flex space-x-4 border p-4 rounded-md justify-start w-full overflow-x-auto'>

    {groupedStories.map((userStories)=>(

        <StoryCircle
            key={userStories[0].user.id}
            stories={userStories}
        />

    ))}

</div>
                    <div className='space-y-10 w-full mt-10'>
                        {post.userPost.length>0 && post.userPost.map((item)=>(<PostCard key={item.id} post={item}/>))}
                        
                    </div>
                </div>
                <div className='w-[30%]'>
                    <HomeRight/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

