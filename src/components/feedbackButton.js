import {
  faCaretDown,
  faCaretUp,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import tinycolor from 'tinycolor2';

const Container = styled.button`
  background-color: ${(p) => (p.isSelected ? p.accentColor : "#e5e5e5")};
  border-radius: 3px;
  box-sizing: content-box;
  color: #143628;
  color: #3c3d41;
  cursor: pointer;
  display: inline-block;
  font-family: "Inter", sans-serif;
  font-size: 11pt;
  font-weight: 700;
  line-height: 11pt;
  min-width: 50px;
  padding: 6px 7px;
  text-align: center;
  transition: all 200ms ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: ${(p) =>
      p.isSelected
        ? tinycolor(p.accentColor).lighten(15).toString()
        : p.accentColor};
    color: #3b3b3c;
  }

  &:focus {
    background-color: ${(p) =>
      tinycolor(p.isSelected ? p.accentColor : "#e5e5e5")
        .darken(p.isSelected ? 4 : 10)
        .toString()};
  }

  &,
  :hover,
  :focus,
  :active {
    border: none;
    outline: none;
  }

  > span {
    margin-right: 3px;
    text-transform: ${(p) => p.textTransform};
  }

  > svg {
    font-size: ${(p) => p.iconSize}pt;
  }
`;

const sentimentToColor = {
  bad: "#ff7c7c",
  ok: "#fbc47a",
  good: "#00ff99",
};

const trendToIcon = {
  down: faCaretDown,
  nochange: faEquals,
  up: faCaretUp,
};

export const FeedbackButton = (props) => {
  const { sentiment, trend } = props;
  const accentColor = sentimentToColor[sentiment];

  return (
    <Container
      onClick={props.onClick}
      isSelected={props.isSelected}
      accentColor={accentColor}
      iconSize={trend === "nochange" ? 9 : 11}
      textTransform={sentiment === "ok" ? "uppercase" : "capitalize"}
    >
      <span>{sentiment}</span>
      <FontAwesomeIcon icon={trendToIcon[trend]} />
    </Container>
  );
};
