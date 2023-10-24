import React, { useState } from "react";
import StartGameScreen from "./components/StartGameScreen";
import { InGameScreen } from "./components/InGameScreen";

function App() {
  const [isStartScreen, setIsStartScreen] = useState<boolean>(true);
  const [isInGameScreen, setIsInGameScreen] = useState<boolean>(false);

  const handleClickStart = () => {
    setIsStartScreen(!isStartScreen);
    setIsInGameScreen(true);
  };
  return (
    <div className="App">
      {isStartScreen && <StartGameScreen onClickStart={handleClickStart} />}
      {isInGameScreen && <InGameScreen />}
    </div>
  );
}

export default App;
