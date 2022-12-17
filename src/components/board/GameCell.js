import { BsFlagFill, BsSunFill } from "react-icons/bs";
import {
    CELL_VALUE_0,
    CELL_VALUE_1,
    CELL_VALUE_2,
    CELL_VALUE_3,
    CELL_VALUE_4,
    CELL_VALUE_5,
    CELL_VALUE_6,
    CELL_VALUE_7,
    CELL_VALUE_8,
    CELL_VALUE_INITIAL,
    CELL_VALUE_FLAG,
    CELL_VALUE_FALSE_FLAG,
    CELL_VALUE_MINE,
    CELL_VALUE_MINE_EXPLODED,
} from "../../models/Cell";
import { useGameContext } from "../../state/GameState";


/**
 * Defines the tailwind classes to control the colors applicable to each type of square on the board
 * @type {object}
 */
const colorsSet = {
    [CELL_VALUE_0]: "from-neutral-200/50 to-neutral-400/70 shadow-neutral-700/40 ",
    [CELL_VALUE_1]: "from-green-200/50 to-green-400/70 shadow-neutral-700/40 ",
    [CELL_VALUE_2]: "from-yellow-200/50 to-yellow-400/70 shadow-neutral-700/40 ",
    [CELL_VALUE_3]: "from-orange-200/50 to-orange-400/70 shadow-neutral-700/40 ",
    [CELL_VALUE_4]: "from-rose-300/50 to-rose-500/70  shadow-neutral-700/40 ",
    [CELL_VALUE_5]: "from-red-400/50 to-red-600/70 shadow-neutral-700/40 ",
    [CELL_VALUE_6]: "from-pink-300/50 to-pink-500/70 shadow-neutral-700/40 ",
    [CELL_VALUE_7]: "from-fuchsia-400/50 to-fuchsia-600/70 shadow-neutral-700/40 ",
    [CELL_VALUE_8]: "from-violet-400/50 to-violet-600/70 shadow-neutral-700/40 ",
    [CELL_VALUE_INITIAL]: "from-neutral-400 to-neutral-500  hover:from-neutral-400 hover:to-neutral-300 shadow-neutral-200/60 hover:shadow-neutral-500/60 ",
    [CELL_VALUE_FLAG]: "from-neutral-300 to-neutral-500 shadow-neutral-200/60 ",
    [CELL_VALUE_FALSE_FLAG]: "from-red-600/50 to-red-800/70 shadow-neutral-200/60 ",
    [CELL_VALUE_MINE]: "from-neutral-500/70 to-neutral-700/70 shadow-neutral-700/40 ",
    [CELL_VALUE_MINE_EXPLODED]: "text-red-600 from-neutral-300/70 to-neutral-400/70 shadow-neutral-700/40 ",
};

/**
 * Renders an individual square on the board
 * @param value {string} constant that defines what type of cell needs to be rendered (see Cell.js)
 * @param playCell {function} function that executes playing the square (id it is not already played)
 * @param flagCell {function} function to add/remove a flag on the square
 * @returns {JSX.Element}
 * @constructor
 */
const GameCell = ({ value, playCell, flagCell }) => {
    const { squareSize } = useGameContext();

    let cellClasses = " flex items-center justify-center bg-gradient-to-br " +
                    " font-bold font-mono select-none shadow-inner rounded"
                    + ` ${colorsSet[value]} `;

    return (
        <div className='p-[1px]'>
            {/* the square size is computed based on the dimensions of the window and the number of cells on the board */}
            <div
                className={ cellClasses }
                onClick={ playCell }
                onContextMenu={ flagCell }
                style={{
                    width: squareSize,
                    height: squareSize,
                    fontSize: Math.floor(squareSize * 0.66),
                }}
            >
                {/* render either a flag icon, a mine icon or the number of surrounding mines, depending on the type/value of the cell */}
                {[CELL_VALUE_FLAG, CELL_VALUE_FALSE_FLAG].includes(value) && (
                    <BsFlagFill />
                )}
                {[CELL_VALUE_MINE, CELL_VALUE_MINE_EXPLODED].includes(value) && (
                    <BsSunFill />
                )}
                {(!!Number(value)) && <div style={{height: '1.25em'}}>{value}</div>}
            </div>
        </div>
    );
}

export default GameCell;
