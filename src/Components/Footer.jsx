import React from 'react'
import styled from "styled-components";

export default function Footer() {
  return (
     <Container>
          <ul>
               <li>FAQ</li>
               <li>Media Center</li>
               <li>Ways to Watch</li>
               <li>Cookie Preferences</li>
               <li>Speed Test</li>
          </ul>
          <ul>
               <li>Helps Center</li>
               <li>Invertor Relations</li>
               <li>Terms Of Use</li>
               <li>Corporate Information</li>
               <li>Legal Notices</li>
          </ul>
          <ul>
               <li>Accounts</li>
               <li>Jobs</li>
               <li>Privacy</li>
               <li>Contact Us</li>
               <li>Watch Only Netflix</li>
          </ul>
     </Container>
  )
}
const Container = styled.div`
     color: rgba(255,255,255,0.7);
     text-decoration : underline;
     background : black;
     display:flex;
     align-items : center;
     justify-content : space-evenly;
     ul{
          margin : 2rem;
          li{
               list-style-type:none;
               gap:0.4rem;
               padding : 0.6rem;
          }
     }
`
