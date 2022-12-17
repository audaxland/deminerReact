import GameCell from "./GameCell";
import {useGameContext} from "../../state/GameState";
import WonPrompt from "./WonPrompt";
import PauseMessage from "./PauseMessage";

/**
 * The game board, where the game is played..
 * @returns {JSX.Element}
 * @constructor
 */
const GameBoard = () => {
    /**
     * @type wonPrompt {boolean} true when we want to ask the user for his/her name after winning the game
     * @type setWonPrompt {function} callback used to remove the won prompt message
     * @type game {Game} instance of the game
     * @type gameBoard {array} state of the board cells to be rendered
     * @type play {function}  function that plays a given cell, when not yet played
     * @type flag {function} function that toggle the flag on a cell, when not yet played
     * @type isPause {boolean} true when the game is on pause
     * @type togglePause {function} resumes the game when paused and clicking on the 'resume game'
     */
    const {wonPrompt, setWonPrompt, game, gameBoard, play, flag, isPause, togglePause} = useGameContext();

    return (
        <div className='relative flex flex-row justify-center items-center'>
            {/* controls displayed on top of the board */}
            {(!!isPause ) && <PauseMessage togglePause={togglePause} />}
            {wonPrompt && <WonPrompt game={game} closePrompt={() => setWonPrompt(false)}/>}

            {/*
                The board with all the squares...
                Right click is used to flag squares, therefore the default 'onContextMenu' is disabled
            */}
            <div
                className={`flex flex-row justify-center items-center ${isPause ? 'blur-xl' : ''}`}
                onContextMenu={e => e.preventDefault()}
            >
                {gameBoard.map((row, rowIndex) => (
                    <div
                        className="flex flex-col"
                        key={rowIndex}
                    >
                        {row.map(({x, y, value, isPlayed}) => (
                            <GameCell
                                key={x + '_' + y}
                                value={value}
                                playCell={isPlayed ? undefined : play(x, y)}
                                flagCell={isPlayed ? undefined : flag(x, y)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
