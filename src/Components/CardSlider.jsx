import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
  // References to DOM elements
  const listRef = useRef();

  // State variables
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showcontrols, setShowControls] = useState(false);

  // Function to handle navigation (left and right) of the slider
  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-260 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    // Styled container with hover effect for showing navigation controls
    <Container
      className="flex column"
      showcontrols={showcontrols}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        {/* Left navigation arrow */}
        <div
          className={`slider-action left ${
            !showcontrols ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        {/* Horizontal slider to display cards */}
        <div className="slider flex" ref={listRef}>
          {/* Render each card based on the provided data */}
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={index} />;
          })}
        </div>
        {/* Right navigation arrow */}
        <div
          className={`slider-action right ${
            !showcontrols ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});

// Styled component for the card slider container
const Container = styled.div`
  gap: 1rem;
  position: relative;
  color:white;
  cursor: pointer;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
