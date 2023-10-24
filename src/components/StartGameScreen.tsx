import React from "react";
import styled from "styled-components";

interface Props {
  onClickStart: () => void;
}

const StartGameScreen = ({ onClickStart }: Props) => {
  return (
    <StyledContainer>
      <StyledTitle>Welcome to React Quiz Game!</StyledTitle>
      <StyledButton onClick={onClickStart}>Start</StyledButton>
    </StyledContainer>
  );
};

export default StartGameScreen;

const StyledTitle = styled.div`
  color: white;
  text-align: center;
  font-size: 3rem;
  line-height: 1;
  font-weight: 700;
`;

const StyledContainer = styled.div`
  width: 1000px;
  height: 200px;
  margin: 64px auto;
`;

const StyledButton = styled.button`
  width: 170px;
  height: 52px;
  border-radius: 10px;
  border: none;
  background-color: #6ed5b7;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin: 24px auto;
  display: block;
  box-sizing: border-box;
  &:hover {
    color: white;
    background-color: #639647fa;
  }
`;
