import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;

const StoryViewer = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextStory = useCallback(() => {
    if (!stories || stories.length === 0) return;

    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setActiveIndex((prev) => prev + 1);
    } else {
      navigate("/");
    }
  }, [currentStoryIndex, stories, navigate]);

  useEffect(() => {
    if (!stories || stories.length === 0) return;

    const interval = setInterval(() => {
      handleNextStory();
    }, 2000);

    return () => clearInterval(interval);
  }, [handleNextStory]);

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <StoryViewerContainer>
        <StoryImage
          src={stories[currentStoryIndex]?.image}
          alt={`Story ${currentStoryIndex + 1}`}
        />

        <div className="absolute top-0 flex w-full">
          {stories.map((item, index) => (
            <ProgressBar
              key={index}
              duration={2000}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </StoryViewerContainer>
    </div>
  );
};

export default StoryViewer;