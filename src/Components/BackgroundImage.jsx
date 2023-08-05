import React from 'react'
import background from "../assets/login.jpg";
import styled from "styled-components";
export default function BackgroundImage() {
  return (
    // There is only background image
    <Container>
          <img src={background} alt="background" />
    </Container>
  )
}

const Container = styled.div`
     height: 100vh;
     width: 100vw;
     img {
          height: 100vh;
          width: 100vw;
     }
`;
