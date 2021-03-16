import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const Row = styled.button`
  background-color: #fafafa;
  color: #143628;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-family: "Inter", sans-serif;
  font-size: 14pt;
  font-weight: 700;
  padding: 20px 0;
  transition: all 200ms ease-in-out;
  white-space: nowrap;
  width: 100%;

  &,
  :hover,
  :focus,
  :active {
    border: none;
    outline: none;
  }

  &:hover,
  :focus {
    background-color: ${tinycolor("#fafafa").darken(4).toString()};

    & span#arrow {
      color: #6633cc;
      transform: translateX(5px);
    }

    & span#index {
      color: #6633cc;
      opacity: 1;
      transform: translateX(-5px);
    }
  }

  &:focus {
    background-color: ${tinycolor("#fafafa").darken(8).toString()};
  }
`;

const Index = styled.span.attrs({ id: "index" })`
  transition: all 200ms ease-in-out;
  opacity: 0.3;
  text-align: right;
  flex-grow: 1;
  flex-basis: 0;
`;

const SurveyDate = styled.span`
  text-align: center;
  padding: 0 25px;
  min-width: 11ch;
  flex-basis: 0;
`;

const State = styled.span`
  text-align: left;
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  align-items: center;

  > span#responses {
    font-size: 0.6em;
    background-color: #dcdcdc;
    padding: 2px 5px;
    border-radius: 2px;
    vertical-align: middle;
  }

  > span#checkmark {
    margin-right: 15px;
    color: #a4a4a4;
  }

  > span#arrow {
    color: #a4a4a4;
    transition: all 200ms ease-in-out;
  }
`;

export const Survey = (props) => (
  <Row onClick={props.onClick}>
    <Index>#{props.index}</Index>
    <SurveyDate>
      {new Date(props.date).toLocaleDateString("en-gb", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </SurveyDate>
    <State>
      {props.completed ? (
        <React.Fragment>
          <span id="checkmark">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span id="responses">{props.responseCount} responses</span>
        </React.Fragment>
      ) : (
        <span id="arrow">
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      )}
    </State>
  </Row>
);
