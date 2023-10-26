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
  
  const handleClickStart = () => {
    setIsStartScreen(!isStartScreen);
    setIsInGameScreen(true);
  };

  const handleSubmitGame = (score: number) => {
    if(window.confirm('Do you want to submit answers ?')) {
      setFinalScore(score);
      setIsSumittedScreen(true);
      setIsInGameScreen(false);
    }
  }
  const handlerReviewClicked = () => {
    setIsReviewedMode(true);
    setIsInGameScreen(true);
    setIsSumittedScreen(false);
  }
  const handlerRestartClicked = () => {
    setIsStartScreen(true);
    setIsSumittedScreen(false);
  }
  
  return (
    <div className="App">
      {isStartScreen && <StartGameScreen onClickStart={handleClickStart} />}
      {isInGameScreen && <InGameScreen onSubmit={handleSubmitGame} isReviewedMode={isReviewedMode} />}
      {isSumittedScreen && <EndGameScreen score={finalScore} onReviewClicked={handlerReviewClicked } onRestartClicked={handlerRestartClicked}/>}
    </div>
  );
}

export default App;
 