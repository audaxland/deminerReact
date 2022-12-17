import ActionButton from "../controls/ActionButton";
import {useEffect, useState} from "react";
import {formatTimeToMMSS} from "../../utils/time";

/**
 * Renders an overlay and prompt message above the board, when the player has just won the game
 * this asks for the player's name, which is stored as 'best time', if the game was won in the top
 * best times for this game size.
 * @param game {Game} Instance of the current game
 * @param closePrompt {function} callback to close the prompt/overlay
 * @returns {JSX.Element}
 * @constructor
 */
const WonPrompt = ({game, closePrompt}) => {
    /**
     * @type name {string} the player's name typed in the input field
     */
    const [name, setName] = useState('');

    /**
     * @type bestScores {object} The list of all best times as stored in the browser's "localStorage"
     */
    const [bestScores, setBestScores] = useState({});

    /**
     * @type sizeName {string} String value used to identify the current game size in the best times stored in localStorage
     */
    const [sizeName, setSizeName] = useState('');

    /**
     * @type isTopScore {boolean} true is the game won qualifies as a 'top best time' to be stored in localStorage
     */
    const [isTopScore, setIsTopScore] = useState(false);

    /**
     * Reads the best times stored in the browser's localStorage, and determines is the game won is a top bes time
     */
    useEffect(() => {
        const storedBestScores = localStorage.getItem('bestScores');
        const bestScores = storedBestScores ? JSON.parse(storedBestScores) : {}
        const sizeNameKey = game.sizeX + 'x' + game.sizeY + ' ~ ' + game.mines + ' mines';
        setSizeName(sizeNameKey);
        if (!bestScores[sizeNameKey]) {
            bestScores[sizeNameKey] = [];
        }
        setBestScores(bestScores);

        // checks if the current game won qualifies as a top 10 best times for this game size
        if ((bestScores[sizeNameKey].length < 10) || bestScores[sizeNameKey].find(item => item.time > game.totalTime)) {
            setIsTopScore(true);
            return;
        }
        setIsTopScore(false);
    }, [game])

    /**
     * saves the player's name is the top best times in localStorage
     * @param e
     */
    const onSubmit = e => {
        e.preventDefault();
        if (!isTopScore) return;
        const newBestScores = {...bestScores};
        newBestScores[sizeName] = [...bestScores[sizeName], {name, time: game.totalTime}];
        newBestScores[sizeName].sort((a, b) => (a.time > b.time ? 1 : (a.time < b.time ? -1 : 0)));
        newBestScores[sizeName] = newBestScores[sizeName].slice(0,10);
        setBestScores(newBestScores);
        localStorage.setItem('bestScores', JSON.stringify(newBestScores));
        closePrompt();
    }

    return (
        <div className='absolute h-full w-full flex justify-center items-center z-10 bg-gradient-to-b
        from-lime-300/10 to-lime-200/20 via-lime-600'>
            <div className='font-extrabold text-lime-900 px-10 py-5 flex flex-col justify-center items-center gap-5
                    bg-lime-100/90 rounded-lg shadow-lg shadow-lime-900
                    text-center z-100'>
                <h1 className='text-4xl'>You won!!</h1>
                <h3 className='text-lg'>Your time is:</h3>
                <h3 className='text-2xl'>{formatTimeToMMSS(game.totalTime)}</h3>

                {/* Only display the text input if the game won qualifies as a top best time */}
                {(!!isTopScore) && (
                    <form className="flex flex-col gap-2 justify-center items-center">
                        <label className='text-lg '>Enter your Name</label>
                        <input
                            className='px-4 py-0.5 rounded w-56'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <ActionButton onClick={onSubmit} disabled={!name}>Submit</ActionButton>
                    </form>
                )}

                {/* Just close the prompt window when the game won does not qualify as top best time*/}
                {(!isTopScore) && (
                    <ActionButton onClick={() => closePrompt()}>Ok</ActionButton>
                )}
            </div>
        </div>
    );
}

export default WonPrompt;
