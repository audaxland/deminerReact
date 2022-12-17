import GameScreen from "./screens/GameScreen";
import SelectSizeScreen from "./screens/SelectSizeScreen";
import {SCREENS, useGameContext} from "./state/GameState";
import CustomSizeScreen from "./screens/CustomSizeScreen";
import BestTimesScreen from "./screens/BestTimesScreen";

function App() {
  const { screen } = useGameContext();
  return (
    <div
        className="flex flex-row justify-center items-center h-screen  p-5
         items-stretch bg-[url('./assets/minefield.jpg')] bg-center bg-cover"
    >
        <div className="backdrop-blur flex flex-row p-5 gap-10 bg-lime-100/50 rounded-3xl h-full">
            {(screen === SCREENS.GAME) && <GameScreen />}
            {(screen === SCREENS.SIZE) && <SelectSizeScreen />}
            {(screen === SCREENS.CUSTOM) && <CustomSizeScreen />}
            {(screen === SCREENS.BEST_TIMES) && <BestTimesScreen />}
        </div>
    </div>
  );
}

export default App;
