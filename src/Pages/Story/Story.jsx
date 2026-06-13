

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StoryViewer from '../../Components/StoryComponents/StoryViewer';
import { fetchUserStoryAction } from '../../Redux/Story/Action'

const Story = () => {

    const { userId } = useParams();

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const { story } = useSelector(store=>store);

    useEffect(()=>{

    dispatch(fetchUserStoryAction(userId, token));

},[userId, dispatch, token])

    return (

        <div>

            {
                story.userStories.length > 0 &&
                <StoryViewer stories={story.userStories}/>
            }

        </div>
    )
}

export default Story;