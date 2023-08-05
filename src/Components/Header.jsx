import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
    const navigate = useNavigate();
    return (
        <Container className="flex a-center j-between">
            {/* logo */}
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            
            {/* if login is true goto login else signup */}
            <button
                onClick={() => navigate(props.login ? "/login" : "/signup")}
            >
                {props.login ? "Login" : "SignUp"}
            </button>
        </Container>
    );
}

const Container = styled.div`
    padding: 0 4rem;
    .logo {
        img {
            height: 5rem;
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
`;
