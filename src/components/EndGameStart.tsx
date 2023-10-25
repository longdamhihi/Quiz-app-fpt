import React from "react";
import styled from "styled-components";

interface EndGameScreenProps {
  score: number;
  onReviewClicked: () => void;
}

const EndGameScreen = ({ onReviewClicked, score } : EndGameScreenProps) => {
  const restartGame = () => {
    //  logic to restart 
  };

  return (
    <div>
      <Headline>Your Score is: {score}</Headline>
      <RestartButton onClick={restartGame}>Try Again</RestartButton>
      <ReviewButton onClick={onReviewClicked}>Review</ReviewButton>
    </div>
  );
};

const Headline = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: white;
`;

const ButtonEndGame = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 700;
`;

const RestartButton = styled(ButtonEndGame)`
  background-color: #6ed5b7;
`;

const ReviewButton = styled(ButtonEndGame)`
  background-color: #ef4444;
  color: white;
`;

export default EndGameScreen;