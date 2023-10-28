import React, { useEffect, useState } from "react";
import question_content from "../data/questions.json";
import styled from "styled-components";
import { IQuestion } from "../types/question";

interface Props {
  onSubmit: (finalScore: number) => void;
  isReviewedMode: boolean;
}

const InGameScreen = ({ onSubmit, isReviewedMode }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(90);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0 && score) {
      clearInterval(countDown);
      onSubmit(score);
    }
    return () => clearInterval(countDown);
  }, [timer]);

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const currentContext: IQuestion | undefined = question_content.find(
      (x) => Number(x.id) - 1 === currentQuestion
    );
    if (
      currentContext?.answers.find(
        (y) => y.answer_content === answer && y.correct
      )
    ) {
      setScore(score + 1);
    }
  };

  const handleSubmit = () => {
    if (currentQuestion === question_content.length - 1) { 
      onSubmit(score);
    } else {
      handleNext();
    }
  };

  const renderAnswers = () => {
    const question = question_content[currentQuestion];
    return question.answers.map((answer, index) => (
      <StyledAnswer
        isReviewedMode={isReviewedMode}
        isCorrect={answer.correct}
        isSelected={answer.answer_content === selectedAnswer}
        disabled={isReviewedMode}
        onClick={() => handleAnswerSelect(answer.answer_content)}
      >
        {index + 1}) {answer.answer_content}
      </StyledAnswer>
    ));
  };

  return (
    <StyledContainer>
      <StyledButton>
        <StyledButtonPrevious
          className="btn"
          disabled={currentQuestion === 0}
          onClick={handlePrevious}
        >
          Previous
        </StyledButtonPrevious>

        <StyledButtonNext
          disabled={currentQuestion === question_content.length - 1}
          onClick={handleNext}
        >
          Next
        </StyledButtonNext>

        {currentQuestion === question_content.length - 1 ? (
          <StyledButtonSubmit onClick={handleSubmit}>Submit</StyledButtonSubmit>
        ) : (
          <></>
        )}
      </StyledButton>

      <StyledQuestion>
        <StyledTimer className="timer">Timer: {timer}s</StyledTimer>

        <IndexQuestion>
          Question {currentQuestion + 1}/{question_content.length}
        </IndexQuestion>
        <Question>
          {question_content[currentQuestion].question_content}
        </Question>
      </StyledQuestion>

      <Answer>{renderAnswers()}</Answer>
    </StyledContainer>
  );
};

export default InGameScreen;

const StyledContainer = styled.div``;

const StyledAnswer = styled.button<{
  isReviewedMode: boolean;
  isCorrect: boolean;
  isSelected: boolean;
}>`
  background-color: ${(props) => (!props.isReviewedMode ? "white" : props.isSelected ? "blue" : props.isCorrect ? " #10B981"  : "white" )};
  color:${(props) => (!props.isReviewedMode ? "black" : props.isSelected ? "blue" : props.isCorrect ? " white"  : "black" )};
  width: 40rem;
  height: 4rem;
  padding: 0 1rem;
  display: block;
  border-width: 2px;
  border-radius: 0.375rem;
  cursor: pointer;
  margin: 0.75rem auto;
   &:hover {
    background-color: #312e81;
    color: white;
  }
  &:focus {
    background-color: #312e81;
    color: white;
  }
  &:active {
    background-color: #312e81;
    color: white;
  }
`;

const Answer = styled.div`
  font-weight: 500;
  line-height: 1.75rem;
  font-size: 1.125rem;
`;

const StyledButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
`;

const BtnInGame = styled.button`
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  &:hover {
    color: white;
  }
`;

const StyledButtonPrevious = styled(BtnInGame)`
  background-color: rgb(107, 114, 128);
  color: white;
  &:hover {
    background-color: gray;
  }
`;

const StyledButtonNext = styled(BtnInGame)`
  background-color: rgb(110, 231, 183);
`;

const StyledButtonSubmit = styled(BtnInGame)`
  background-color: rgb(245, 158, 11);
`;

const StyledQuestion = styled.div`
  width: 45rem;
  height: 10rem;
  padding-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: white;
  margin: 2.5rem auto;
  border-radius: 0.375rem;
`;

const Question = styled.div`
  text-align: center;
  line-height: 1.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
`;

const StyledTimeAndQuestion = styled.div`
  font-weight: 500;
  line-height: 1.75rem;
  font-size: 1.125rem;
  text-align: center;
`;

const IndexQuestion = styled(StyledTimeAndQuestion)`
  color: rgb(67, 56, 202);
`;

const StyledTimer = styled(StyledTimeAndQuestion)`
  margin-bottom: 1rem;
`;
