import ActionButton from "./ActionButton";
import {SCREENS, useGameContext} from "../../state/GameState";

/**
 * Renders the control action buttons next to the game board
 * @returns {JSX.Element}
 * @constructor
 */
const ControlActions = () => {
    /**
     * @type game {Game} instance of the game
     * @type newGame {function} resets the game
     * @type setScreen {function} setter for the current screen, used to navigate to another screen
     * @type isPaused {boolean} true when the game is on pause
     * @type togglePause {function} toggle the game in or out of pause
     */
    const {game, newGame, setScreen, isPause, togglePause} = useGameContext();

    return (
        <div
            className="flex flex-wrap sm:flex-col gap-1 justify-center"
        >
            {(!!game.startTime) && (!game.gameOver) && (
                <ActionButton onClick={togglePause}>{isPause ? 'Resume Game' : 'Pause'}</ActionButton>
            )}
            {(!!game.startTime) && (
                <ActionButton onClick={newGame}>Start Over</ActionButton>
            )}
            <ActionButton onClick={() => setScreen(SCREENS.SIZE)}>Change Difficulty</ActionButton>
            <ActionButton onClick={() => setScreen(SCREENS.BEST_TIMES)}>Best Times</ActionButton>
        </div>
    );
}

export default ControlActions;
