import React from 'react'
import StoryViewer from '../../Components/StoryComponents.jsx/StoryViewer'

const Story = () => {
    const story = [
        {
            image: "https://images.pexels.com/photos/33009459/pexels-photo-33009459.jpeg"
        },{
            image: "https://images.pexels.com/photos/34055835/pexels-photo-34055835.jpeg"
        },{
            image: "https://images.pexels.com/photos/33745086/pexels-photo-33745086.jpeg"
        },{
            image: "https://images.pexels.com/photos/34094241/pexels-photo-34094241.jpeg"
        },{
            image: "https://images.pexels.com/photos/34058996/pexels-photo-34058996.jpeg"
        }
    ]
  return (
    <div>
        <StoryViewer stories={story}/>
    </div>
  )
}

export default Story