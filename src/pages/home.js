import React from "react";
import styled from "styled-components";

const Home = () => {
    const Title = styled.h1 `
        font-size: 3em;
        text-align: center;
        color: black;
        font-weight: bolder;
    `;
    return (
        <Title>
            Welcome To AI Restaurant!
        </Title>
    );
};

export default Home;
