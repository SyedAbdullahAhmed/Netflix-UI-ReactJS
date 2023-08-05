import React from 'react'
import styled from "styled-components";
import BackgroundImage from '../Components/BackgroundImage';
import Header from "../Components/Header";
import { useState } from 'react';
import {firebaseAuth} from "../Utils/firebase-config.js";
import { createUserWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // for navigation
  const navigate = useNavigate();

  // use states
  const [showpassword, setShowPassword] = useState(false);
  // initially values are none
  const [formValues, setFormValues] = useState({
    email : "",
    password: "",
  })

  // create user from firebase and handle
  const handleSignIn = async () => {
    try {
      // destructure values from "formValues" and create user
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  //if current user is logged in goto main page
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showpassword={showpassword}>
      <BackgroundImage/>
      <div className="content">
        <Header login/>
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch Anywhere , Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create ot or restart membership</h6>
          </div>
          <div className="form">
            <input type="email" placeholder='Email Address' name='email' 
            // initially value is ''
            value={formValues.email} 
            // onchange update input value 
            onChange={(e)=>{
              setFormValues({
                ...formValues,[e.target.name] : e.target.value
              })
            }} />
            {/* when showpassword is true it shows the password input */}
            {showpassword && <input type="password" placeholder='Password' name='password' 
             // initially value is ''
            value={formValues.password}
            // onchange update input value 
               onChange={(e)=>{
                setFormValues({
                  ...formValues,[e.target.name] : e.target.value,
                })
              }}
            />}
            {/* change showpassword to true */}
            {!showpassword && <button onClick={()=>setShowPassword(true)}>Getting Started</button>}
          </div>
          <button onClick={handleSignIn}>SignUp</button>
        </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    color:white;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 1.5rem;

        h1 {
          font-weight:900;
          padding: 0 10rem;
        }
        h4,h6 {
          font-weight:500;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showpassword }) =>
          showpassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
        button:hover {
          transition: ease .60s;
          transform: scale(1.1);
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
      button:hover {
        transition: ease .60s;
        transform: scale(1.1);
      }
    }
  }
`;
