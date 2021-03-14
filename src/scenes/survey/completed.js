import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { PlainContainer } from "../../components/misc";

const Container = styled(PlainContainer)`
  padding: 60px 30px 80px;
  text-align: center;

  > h1 {
    font-size: 14pt;
    font-weight: 700;
  }

  > p {
    font-size: 14pt;
    font-weight: 400;
    line-height: 1.5em;
    margin: auto;
    max-width: 450px;
  }
`;

const Icon = styled.div`
  color: #00ff99;
  font-size: 50pt;
`;

export const Completed = (props) => (
  <Container>
    <Icon>
      <FontAwesomeIcon icon={faCheck} />
    </Icon>
    {props.presentlySubmitted ? (
      <React.Fragment>
        <h1>Response Submitted</h1>
        <p>Thanks for completing the survey! Your answers are now saved.</p>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h1>Survey completed</h1>
        <p>
          {"Thanks for completing the survey! You submitted your response on " +
            props.completedOn.toLocaleDateString("en-gb", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          .
        </p>
      </React.Fragment>
    )}
  </Container>
);
