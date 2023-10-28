import React, { useEffect, useState } from "react";
import question_content from "../data/questions.json";
import styled from "styled-components";
import { IQuestion } from "../types/question";

interface Props {
  isReviewedMode: boolean;
  userAnswers: string[];
  onSubmit: (selectedAnswers: string[], finalScore: number) => void;
  onRestartClicked: () => void;
}

const InGameScreen = ({
  isReviewedMode,
  userAnswers,
  onSubmit,
  onRestartClicked,
}: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(question_content.length).fill("")
  );
  const [timer, setTimer] = useState<number>(90);
  const [score, setScore] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0 && score) {
      clearInterval(countDown);
      onSubmit(selectedAnswers, score);
    }
    return () => clearInterval(countDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const isButtonActive = (buttonId: number) => activeButton === buttonId;

  const handleAnswerSelect = (index: number, selectedAnswer: string) => {
    setActiveButton(index);
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = selectedAnswer;
    setSelectedAnswers(newSelectedAnswers);
    const currentContext: IQuestion | undefined = question_content.find(
      (x) => Number(x.id) - 1 === currentQuestion
    );
    if (
      currentContext?.answers.find(
        (y) => y.answer_content === selectedAnswer && y.correct
      )
    ) {
      setScore(score + 1);
    }
  };

  const handlePrevious = () => {
    setActiveButton(null);
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNext = () => {
    setActiveButton(null);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleSubmit = () => {
    onSubmit(selectedAnswers, score);
  };

  const renderAnswers = () => {
    const question = question_content[currentQuestion];
    return question.answers.map((answer, index) => (
      <StyledAnswer
        isReviewedMode={isReviewedMode}
        isCorrect={answer.correct}
        isSelected={answer.answer_content === userAnswers[index]}
        isActive={isButtonActive(index)}
        value={answer.answer_content}
        onClick={(e) => handleAnswerSelect(index, e.currentTarget.value)}
      >
        {index + 1})&nbsp;{answer.answer_content}
      </StyledAnswer>
    ));
  };

  return (
    <StyledContainer>
      <StyledButtonContainer>
        <StyledButtonPrevious
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

        {isReviewedMode ? (
          <StyledRestartButton onClick={onRestartClicked}>
            Try Again
          </StyledRestartButton>
        ) : currentQuestion === question_content.length - 1 ? (
          <StyledButtonSubmit onClick={handleSubmit}>Submit</StyledButtonSubmit>
        ) : (
          <></>
        )}
      </StyledButtonContainer>

      <StyledQuestionContainer>
        <StyledTimer>Timer: {timer}s</StyledTimer>

        <StyledQuestionIndex>
          Question {currentQuestion + 1}/{question_content.length}
        </StyledQuestionIndex>
        <StyledQuestion>
          {question_content[currentQuestion].question_content}
        </StyledQuestion>
      </StyledQuestionContainer>

      <StyledAnswerContainer>{renderAnswers()}</StyledAnswerContainer>
    </StyledContainer>
  );
};

export default InGameScreen;

const StyledContainer = styled.div``;

const StyledAnswer = styled.button<{
  isReviewedMode: boolean;
  isActive: boolean;
  isCorrect: boolean;
  isSelected: boolean;
}>`
  background-color: ${(props) =>
    props.isReviewedMode
      ? props.isCorrect
        ? "#10B981"
        : props.isSelected
        ? "blue"
        : "white"
      : props.isActive
      ? "blue"
      : "white"};
  color: "white";
  width: 40rem;
  height: 4rem;
  padding: 0 1rem;
  display: block;
  border-width: 2px;
  border-radius: 0.375rem;
  cursor: pointer;
  margin: 0.75rem auto;
  &:hover {
    background-color: blue;
    color: white;
  }
`;

const StyledAnswerContainer = styled.div`
  font-weight: 500;
  line-height: 1.75rem;
  font-size: 1.125rem;
`;

const StyledButtonContainer = styled.div`
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

const StyledQuestionContainer = styled.div`
  width: 45rem;
  height: 10rem;
  padding-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: white;
  margin: 2.5rem auto;
  border-radius: 0.375rem;
`;

const StyledQuestion = styled.div`
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

const StyledQuestionIndex = styled(StyledTimeAndQuestion)`
  color: rgb(67, 56, 202);
`;

const StyledTimer = styled(StyledTimeAndQuestion)`
  margin-bottom: 1rem;
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
