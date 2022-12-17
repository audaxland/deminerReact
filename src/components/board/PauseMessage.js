import ActionButton from "../controls/ActionButton";

/**
 * Renders a 'Pause' message and resume button on an overlay above the game board, while the game is paused
 * @param togglePause {function} the function that resumes the game when clicking on the resume button
 * @returns {JSX.Element}
 * @constructor
 */
const PauseMessage = ({ togglePause }) => {
    return (
        <div className='absolute h-full w-full flex justify-center items-center z-10'>
            <div className='text-4xl font-extrabold text-lime-900 p-5 flex flex-col justify-center items-center gap-5
                    bg-gradient-to-l from-lime-300/10 to-lime-400/10 via-lime-200
                    w-full text-center z-100'>
                <div>Game Paused</div>
                <ActionButton onClick={togglePause}>Resume Game</ActionButton>
            </div>
        </div>
    );
}

export default PauseMessage;
