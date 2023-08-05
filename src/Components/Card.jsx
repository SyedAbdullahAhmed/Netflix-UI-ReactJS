import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../Store";
import video from "../assets/video.mp4";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  // Use Navigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Use Dispatch hook from react-redux for dispatching actions
  const dispatch = useDispatch();

  // State variable to track if the card is hovered
  const [isHovered, setIsHovered] = useState(false);

  // State variable to store the user's email retrieved from Firebase authentication
  const [email, setEmail] = useState(undefined);

  // Fetch the current user's email from Firebase authentication
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login"); // If the user is not logged in, redirect to the login page
  });

  return (
    // Container for the card
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Display the card image and make it clickable to navigate to the player page */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {/* Show additional information when the card is hovered */}
      {isHovered && (
        <div className="hover">
          {/* Container for the card image and video */}
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          {/* Container for the card information */}
          <div className="info-container flex column">
            {/* Display the movie name and make it clickable to navigate to the player page */}
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                {/* Icons for Play, Like, Dislike, and Add to List */}
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
               
              </div>
              {/* Icon for displaying more information */}
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

// Styled component for the card container
const Container = styled.div`
  max-width: 230px;
  width: 270px;
  height: 25vh;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      color:white;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 1.8rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: grey;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
