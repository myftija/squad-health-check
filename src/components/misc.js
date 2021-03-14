import styled from "styled-components";

export const PlainContainer = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 11px 0 #4040c6;
  box-sizing: border-box;
  margin: 20px auto;
  max-width: 940px;
  padding: 20px;
`;

export const BarButton = styled.button`
  background-color: #00ff99;
  border-radius: 3px;
  color: #143628;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  font-size: 14pt;
  font-weight: 800;
  margin-top: 15px;
  padding: 15px;
  transition: background-color 200ms ease-in-out;
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
    background-color: #0adb88;
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    background-color: #dfdfdf;
    color: #aaaaaa;
  }
`;

export const TextArea = styled.textarea`
  background-color: #efefef;
  border-radius: 4px;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  color: #3c3d41;
  font-family: "Inter", sans-serif;
  font-size: 13pt;
  margin-bottom: 15px;
  margin: 0;
  padding: 8px;
  width: 100%;
`;

export const SubHeader = styled.div`
  background-color: transparent;
  color: white;
  font-size: 13pt;
  opacity: 0.9;
  text-align: center;
`;
