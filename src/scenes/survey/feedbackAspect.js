import React from "react";
import styled from "styled-components";

import { FeedbackButton } from "../../components/feedbackButton";

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;

  > button + button {
    margin-left: 10px;
  }
`;

const Aspect = styled.div`
  flex-grow: 1;
  font-size: 14pt;
  font-weight: 700;
  padding-right: 10px;
  transition: all 200ms ease-in-out;
  white-space: nowrap;
`;

const Row = styled.div`
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  flex-direction: row;
  padding: 15px 0;

  & ${ButtonGroup} + ${ButtonGroup} {
    margin-left: 30px;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    & ${Aspect} {
      color: #6633cc;
      transform: translateX(5px);
    }
  }

  @media (max-width: 980px) {
    align-items: center;
    flex-direction: column;

    & ${ButtonGroup} {
      width: 100%;

      > button {
        flex-grow: 1;
      }
    }

    & ${ButtonGroup} + ${ButtonGroup} {
      margin-left: 0;
    }

    & ${Aspect} {
      padding: 0;
    }

    &:hover {
      & ${Aspect} {
        transform: none;
      }
    }

    > * + * {
      margin-top: 10px;
    }
  }
`;

const sentiments = ["bad", "ok", "good"];
const trends = ["down", "nochange", "up"];

export const FeedbackAspect = (props) => (
  <Row>
    <Aspect>{props.children}</Aspect>
    {sentiments.map((s) => (
      <ButtonGroup key={s}>
        {trends.map((t) => (
          <FeedbackButton
            key={t}
            sentiment={s}
            trend={t}
            onClick={() => props.onFeedbackButtonClick(s, t)}
            isSelected={props.feedbackButtonSelected(s, t)}
          />
        ))}
      </ButtonGroup>
    ))}
  </Row>
);
