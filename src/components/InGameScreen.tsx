import React, { useEffect, useState } from "react";
import question_content from "../data/questions.json";
import styled from "styled-components";

interface Props {
  onSubmit: (finalScore: number) => void;
  isReviewedMode: boolean;
}

const InGameScreen = ({ onSubmit, isReviewedMode }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timer, setTimer] = useState(90);

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(countDown);
      const finalScore = selectedAnswer ? 1 : 0;
      onSubmit(finalScore)
    }
    return () => clearInterval(countDown);
  }, [timer]);

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleAnswerSelect = (answerQuestion: string) => {
    setSelectedAnswer(answerQuestion);
  };

  const handleSubmit = () => {
    const finalScore = selectedAnswer ? 1 : 0;
    if (currentQuestion === question_content.length - 1) {
      onSubmit(finalScore);
    } else {
      handleNext();
    }
  };

  const renderAnswers = () => {
    const question = question_content[currentQuestion];
    return question.answers.map((answer) => (
      <StyledAnswer
        isReviewedMode={isReviewedMode}
        key={answer.answer_content}
        className={`answer ${
          selectedAnswer === answer.answer_content ? "selected" : ""
        }`}
        onClick={() => handleAnswerSelect(answer.answer_content)}
      >
        {answer.answer_content}
      </StyledAnswer>
    ));
  };

  return (
    <StyledContainer>
      <div>
        Question {currentQuestion + 1}/{question_content.length}
      </div>
      <div>{question_content[currentQuestion].question_content}</div>
      <div onMouseEnter={() => (selectedAnswer ? "" : "")}>
        {renderAnswers()}
      </div>
      <div className="timer">Timer: {timer}s</div>
      <div>
        <button onClick={handlePrevious}>
          {currentQuestion === 0 ? "Previous" : "Next"}
        </button>

        <button onClick={handleSubmit}>
          {currentQuestion === question_content.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </StyledContainer>
  );
};

export default InGameScreen;

const StyledContainer = styled.div``;

const StyledAnswer = styled.div<{isReviewedMode: boolean}>`
  color: ${props => (props.isReviewedMode ? 'white' : `blue`)};
  width: 40rem;
    height: 4rem;
    padding: 0 1rem;
    border-width: 2px ;
    border-radius: 0.375rem;
    cursor: pointer;
    margin: 0.75rem auto;
`


