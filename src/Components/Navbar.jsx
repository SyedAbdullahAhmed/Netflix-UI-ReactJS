import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../Utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar({ isScrolled }) {
    // an array of objects for Navbar
     const links = [
          {name: "Home" , link : "/"},
          {name: "TV Shows" , link : "/tvshows"},
          {name: "Movies" , link : "/movies"},
          {name: "My List" , link : "/mylist"},
     ]
     // for navigate
     const navigate = useNavigate();
    // CSS
     const btnStyle = {
      width : "20vw",
      height : "5vh",
      padding : "0.6rem",
      borderRadius : "1rem"
     }
     // if user not registered goto signup or login
     onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/signup");
    });

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
      <div className="left flex a-center">
          {/* logo */}
          <div className="brand flex a-center j-center">
               <img src={logo} alt="logo" />
          </div>
          {/* Navbar */}
          <ul className="links flex">
            {links.map(({name,link})=>{
                return (
                  <li key={name}>
                    <Link to={link}>{name}</Link>
                  </li>
                );
              })
            }
          </ul>
      </div>
      <div className="right flex a-center">
          <div className="search"></div>
          {/* Search Icon */}
          <button >
               <FaSearch/>
          </button>
          {/* Input */}
          <input style={btnStyle} type="text" placeholder="Search"
          />
          {/* To user registered or not */}
          <button onClick={()=>signOut(firebaseAuth)}>
          {/* Power Off Icon */}
              <FaPowerOff/>
          </button>
      </div>
      </nav>

    </Container>
  );
}

const Container = styled.div`
   color : white;
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        font-weight : 500;
        font-size : 1.3rem;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          border-radius : 4rem;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          opacity: 1;
          visibility: visible;
          padding: 1rem;
        }
        
      }
    }
  }
`;


