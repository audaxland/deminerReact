import {createContext, useCallback, useContext, useEffect, useState} from "react";
import Game from "../models/Game";
import {useWindowSize} from "@react-hook/window-size";

/**
 * List of screens available
 * @type {object}
 */
export const SCREENS = {
    GAME: 'game',
    SIZE: 'select-size',
    CUSTOM: 'custom-size',
    BEST_TIMES: 'best-times',
}

/**
 * Game context
 * @type {React.Context<{play: play, game: null, flag: flag, gameBoard: null, setWonPrompt: setWonPrompt, newGame: newGame, wonPrompt: null, togglePause: togglePause, screen: null, squareSize: null, setGameSize: setGameSize, isPause: null, setScreen: setScreen, gameSize: null}>}
 */
export const GameState = createContext({
    screen: '',
    setScreen: () => {},
    gameSize: {},
    setGameSize: () => {},
    game: null,
    gameBoard: [[]],
    newGame: () => {},
    play: () => {},
    flag: () => {},
    squareSize: null,
    isPause: false,
    togglePause: () => {},
    wonPrompt: false,
    setWonPrompt: () => {},
});

/**
 * game context shortcut hook
 * @returns {{play: Game.play, game: null, flag: Game.flag, gameBoard: null, setWonPrompt: setWonPrompt, newGame: newGame, wonPrompt: null, togglePause: Game.togglePause, screen: null, squareSize: null, setGameSize: setGameSize, isPause: null, setScreen: setScreen, gameSize: null}}
 */
export const useGameContext = () => useContext(GameState);

/**
 * Computes the size of an individual cell depending on the window size and the number of cells per row/column
 * @param sizeX {int} number of cells horizontally
 * @param sizeY {int} number of cells vertically
 * @param height {int} height of the window
 * @param width {int} width of the window
 * @returns {number} size in pixel of a single cell
 */
const computeSquareSize = ({sizeX, sizeY, height, width}) => {
    const maxWidth = ((width - ( width > 640 ? 280 : 90)) / sizeX) - 2;
    const maxHeight = ((height - ( width > 640 ?  90 : 200 )) / sizeY) - 2;
    return Math.floor(Math.min(maxHeight, maxWidth));
}

/**
 * Context provider for the game state
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const GameStateProvider = ({ children }) => {
    /**
     * @type screen {string} name of the current screen to render
     */
    const [screen, setScreen] = useState(SCREENS.SIZE);

    /**
     * @type gameSize {{sizeX: number, sizeY: number, mines: number}} Current game size
     */
    const [gameSize, setGameSize] = useState({sizeX: 8, sizeY: 8, mines: 10});

    /**
     * @type game {Game} current game instance
     */
    const [game, setGame] = useState(() => new Game({...gameSize}))

    /**
     * @type gameBoard [Cell[]] current game board state, this is a copy of the board defined inside the Game instance
     */
    const [gameBoard, setGameBoard] = useState(() => game.getBoard());

    /**
     * @type width {int} width of the window in pixels
     * @type height {int} height of the window in pixels
     */
    const [width, height] =  useWindowSize();

    /**
     * @type squareSize {int} Size of a single cell in pixels
     */
    const [squareSize, setSquareSize] = useState(computeSquareSize({...gameSize, height, width}))

    /**
     * @type isPause {boolean} true when the game is on pause
     */
    const [isPause, setIsPause] = useState(false);

    /**
     * @type wonPrompt {boolean} true when the prompt for the player's name is opened, immediately after the game is won
     */
    const [wonPrompt, setWonPrompt] = useState(true);

    /**
     * updates the size of a single cell whenever the window changes or the game size changes
     */
    useEffect(() => {
        setSquareSize(computeSquareSize({...gameSize, height, width}));
    }, [gameSize, gameSize.sizeX, gameSize.sizeY, height, width])

    /**
     * resets the game to a new game
     * @type {(function(): void)|*}
     */
    const newGame = useCallback(() => {
        setGame(new Game({...gameSize}));
    }, [gameSize]);

    /**
     * resets the game whenever the game size has changed
     */
    useEffect(() => {
        newGame();
    }, [newGame, gameSize])

    /**
     * new game setup when a new game is created
     */
    useEffect(() => {
        setGameBoard(game.getBoard());
        setIsPause(!!game.startTime)
        setWonPrompt(false);
    }, [game])

    /**
     * callback function to play a given cell of the game
     * @type {function(int, int): function(): void}
     */
    const play = useCallback((x,y) => () => {
        if (game.gameOver) return;
        game.play(x,y);
        setGameBoard(game.getBoard())
        if (game.gameWon) {
            setWonPrompt(true);
        }
    }, [game]);

    /**
     * Callback function that sets a flag on a given cell
     * @type {function(int, int): function(event): void}
     */
    const flag = useCallback((x,y) => e => {
        e.preventDefault();
        game.flag(x,y);
        setGameBoard(game.getBoard())
    }, [game]);

    /**
     * callback that toggles the paused state of the game
     * @type {(function(): void)}
     */
    const togglePause = useCallback(() => {
        if (!game.startTime) return;
        game.togglePause();
        setIsPause(!!game.pauseTime)
    }, [game])

    return (
        <GameState.Provider value={{
            screen,
            setScreen,
            gameSize,
            setGameSize,
            game,
            gameBoard,
            newGame,
            play,
            flag,
            squareSize,
            isPause,
            togglePause,
            wonPrompt,
            setWonPrompt
        }}>
            { children }
        </GameState.Provider>
    );
}

export default GameStateProvider;
