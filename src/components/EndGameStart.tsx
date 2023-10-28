import React from "react";
import styled from "styled-components";

interface EndGameScreenProps {
  score: number;
  onReviewClicked: () => void;
  onRestartClicked: () => void;
}

const EndGameScreen = ({
  onRestartClicked,
  onReviewClicked,
  score,
}: EndGameScreenProps) => {
  return (
    <div>
      <StyledHeadline>Your Score is: {score}</StyledHeadline>
      <StyledButtonContainer>
        <StyledRestartButton onClick={onRestartClicked}>
          Try Again
        </StyledRestartButton>
        <StyledReviewButton onClick={onReviewClicked}>
          Review
        </StyledReviewButton>
      </StyledButtonContainer>
    </div>
  );
};

const StyledHeadline = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: white;
  text-align: center;
  margin-top: 64px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const StyledButtonEndGame = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 700;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: none;
`;

const StyledRestartButton = styled(StyledButtonEndGame)`
  background-color: #6ed5b7;
  &:hover {
    color: white;
    background-color: #6ed5b7;
  }
`;

const StyledReviewButton = styled(StyledButtonEndGame)`
  background-color: #ef4444;
  color: white;
  &:hover {
    color: white;
    opacity: 0.7;
  }
`;

export default EndGameScreen;
