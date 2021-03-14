import styled from "styled-components";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const CircleContainer = styled.div`
  margin: auto;

  > div + div {
    margin-left: 4px;
  }
`;

const Circle = styled.div`
  background-color: #00ff99;
  border-radius: 4px;
  display: inline-block;
  height: 8px;
  opacity: ${(p) => p.opacity};
  width: 8px;
`;

const TextContainer = styled.div`
  color: white;
  font-size: 27pt;
  font-weight: 800;
  text-align: center;
`;

export const Logo = (props) => (
  <Container onClick={props.onClick}>
    <CircleContainer>
      <Circle opacity={0.6} />
      <Circle opacity={0.8} />
      <Circle opacity={1} />
    </CircleContainer>
    <TextContainer>Squad Health Check</TextContainer>
  </Container>
);
