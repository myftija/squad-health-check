import React from "react";
import styled, { keyframes } from "styled-components";
import { PlainContainer, SubHeader } from "../../components/misc";

const oscillate = keyframes`
  0% {
    color: #6633cc;
  }
  50% {
    color: #00ff99;
  }
  100% {
    color: #6633cc;
  }
`;

const Container = styled(PlainContainer)`
  padding: 80px 30px;
  text-align: center;

  > span {
    animation: ${oscillate} 2.5s infinite;
    color: #6633cc;
    font-size: min(22vw, 150pt);
    font-weight: 800;
  }
`;

export const PageNotFound = () => (
  <React.Fragment>
    <SubHeader>¯\_(ツ)_/¯</SubHeader>
    <Container>
      <span>404</span>
    </Container>
  </React.Fragment>
);
