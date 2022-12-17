import {SCREENS, useGameContext} from "../state/GameState";
import {BsArrowLeft} from "react-icons/bs";
import {useEffect, useState} from "react";
import {formatTimeToMMSS} from "../utils/time";

/**
 * Renders the 'Best Times' screen
 * @returns {JSX.Element}
 * @constructor
 */
const BestTimesScreen = () => {
    /**
     * @type setScreen {function} set the screen to new value, used to navigate between screens
     * @type newGame {function} resets the game to a new game
     */
    const { setScreen, newGame } = useGameContext();

    /**
     * @type bestTimes {object} list of best times as read from localStorage
     */
    const [bestTimes, setBestTimes] = useState({});

    /**
     * @type activeTimes {string} name of the list of best times to display
     */
    const [activeTimes, setActiveTimes] = useState('');

    /**
     * @type gameSize {object} current game size
     */
    const {gameSize} = useGameContext()

    /**
     * Reads the best times stored in localStorage and computes the initial active list of best times
     */
    useEffect(() => {
        if (!localStorage.getItem('bestScores')) return;
        const bestStoredTimes = JSON.parse(localStorage.getItem('bestScores'));
        setBestTimes(bestStoredTimes);
        const currentSize = gameSize.sizeX + 'x' + gameSize.sizeY + ' ~ ' + gameSize.mines + ' mines';
        setActiveTimes( bestStoredTimes[currentSize] ? currentSize : (Object.keys(bestStoredTimes)[0]));
    }, [gameSize.sizeX, gameSize.sizeY, gameSize.mines]);

    return (
        <div className='w-[80vw] max-w-[700px]'>
            {/* back link at the top of the page */}
            <div className='w-full'>
                <button
                    className='flex flex-row justify-left items-center gap-3'
                    onClick={() => setScreen(SCREENS.GAME)}
                >
                    <BsArrowLeft />
                    Back
                </button>
            </div>

            <h1 className='text-center font-extrabold text-4xl text-lime-900'>Best Times</h1>

            {(!Object.keys(bestTimes).length) && (
                <div>
                    No best times yet!!!
                </div>
            )}

            {(Object.keys(bestTimes).length) && (
                <>
                    {/* dropdown to select list of active best times to display */}
                    <div className='flex justify-center mt-4'>
                        <select onChange={e => setActiveTimes(e.target.value)}>
                            {Object.keys(bestTimes).map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    {/* List of best times displayed */}
                    <div className='rounded overflow-hidden bg-lime-900 text-lime-200 flex flex-row w-[80%] max-w-[400px] mx-auto
                    text-center mt-4'>
                        <div className='w-16'>Rank</div>
                        <div className='flex-1'>Name</div>
                        <div className='w-36'>Time</div>
                    </div>

                    <div
                        className="overflow-y-auto w-[80%] max-w-[400px] mx-auto text-center"
                        style={{maxHeight: 'calc(100% - 180px)'}}
                    >
                        {(!!bestTimes[activeTimes]) && (bestTimes[activeTimes].map((item, index) => (
                            <div
                                key={index}
                                className=' border-t pt-1 mt-1 border-lime-600 text-lime-900 flex
                                    flex-row text-sm'
                            >
                                <div className='w-16'>{index + 1}.</div>
                                <div className='flex-1'>{item.name}</div>
                                <div className='w-36'>{formatTimeToMMSS(item.time)}</div>
                            </div>
                        ))) }
                    </div>
                </>
            )}

            {/* new game and back buttons at the bottom of the page */}
            <div className='flex flex-col sm:flex-row gap-2 items-center justify-center mt-4'>
                <button
                    className='border border-stone-400 rounded-xl bg-green-600 hover:bg-green-800 p-0.5 text-white
                        hover:shadow hover:shadow-amber-500 px-5'
                    onClick={() => {
                        newGame();
                        setScreen(SCREENS.GAME);
                    }}
                >
                    New Game
                </button>
                <button
                    className='border border-stone-400 rounded-xl bg-stone-200 hover:bg-stone-300 p-0.5 px-5'
                    onClick={() => setScreen(SCREENS.GAME)}
                >
                    Back to Game
                </button>
            </div>
        </div>
    );
}

export default BestTimesScreen;
