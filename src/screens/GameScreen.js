import GameBoard from "../components/board/GameBoard";
import GameControls from "../components/controls/GameControls";

/**
 * Renders the game screen
 * @returns {JSX.Element}
 * @constructor
 */
const GameScreen = () => {
    return (
        <div className='flex flex-col sm:flex-row items-stretch justify-center gap-5'>
            <GameBoard />
            <GameControls />
        </div>
    );
}

export default GameScreen;
