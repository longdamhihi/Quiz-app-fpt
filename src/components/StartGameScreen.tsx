import React from "react";
import styled from "styled-components";

const StartGameScreen = () => {
  return (
    <StyledButton>
      Start
    </StyledButton>
  );
};

export default StartGameScreen;

const StyledButton = styled.button`
  width: 170px;
  height: 52px;
  border-radius: 10px;
  border: none;
  background-color: #6ED5B7;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`
