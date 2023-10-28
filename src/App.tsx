import React, { useState } from "react";
import StartGameScreen from "./components/StartGameScreen";
import InGameScreen from "./components/InGameScreen";
import EndGameScreen from "./components/EndGameStart";

function App() {
  const [isStartScreen, setIsStartScreen] = useState<boolean>(true);
  const [isInGameScreen, setIsInGameScreen] = useState<boolean>(false);
  const [isSumittedScreen, setIsSumittedScreen] = useState<boolean>(false);
  const [isReviewedMode, setIsReviewedMode] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleClickStart = () => {
    setIsStartScreen(!isStartScreen);
    setIsInGameScreen(true);
  };

  const handleSubmitGame = (selectedAnswers: string[], score: number) => {
    if (window.confirm("Do you want to submit answers ?")) {
      setFinalScore(score);
      setUserAnswers(selectedAnswers);
      setIsSumittedScreen(true);
      setIsInGameScreen(false);
    }
  };
  const handlerReviewClicked = () => {
    setIsReviewedMode(true);
    setIsInGameScreen(true);
    setIsSumittedScreen(false);
  };
  const handlerRestartClicked = () => {
    setFinalScore(0);
    setUserAnswers([]);
    setIsReviewedMode(false);
    setIsSumittedScreen(false);
    setIsInGameScreen(false);
    setIsStartScreen(true);
  };

  return (
    <div className="App">
      {isStartScreen && <StartGameScreen onClickStart={handleClickStart} />}
      {isInGameScreen && (
        <InGameScreen
          isReviewedMode={isReviewedMode}
          userAnswers={userAnswers}
          onSubmit={handleSubmitGame}
          onRestartClicked={handlerRestartClicked}
        />
      )}
      {isSumittedScreen && (
        <EndGameScreen
          score={finalScore}
          onReviewClicked={handlerReviewClicked}
          onRestartClicked={handlerRestartClicked}
        />
      )}
    </div>
  );
}

export default App;
