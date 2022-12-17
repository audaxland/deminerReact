import {SCREENS, useGameContext} from "../state/GameState";
import {BsArrowLeft} from "react-icons/bs";

import NumberSelector from "../components/elements/NumberSelector";
import {useState} from "react";

/**
 * Default values for custom game size
 * @type {{minesPercent: number, width: number, height: number}}
 */
const defaultSize = {
    height: 10,
    width: 10,
    minesPercent: 20,
}

/**
 * Renders the screen to select a custom game size
 * @returns {JSX.Element}
 * @constructor
 */
const CustomSizeScreen = () => {
    /**
     * @type setScreen {function} screen setter, used to navigate between screens
     * @type setGameSize {function} sets the new game size
     */
    const { setScreen, setGameSize } = useGameContext();

    /**
     * @type height {int} input field for number of cells vertically
     */
    const [height, setHeight] = useState(defaultSize.height);

    /**
     * @type width {int} input field for number of cells horizontally
     */
    const [width, setWidth] = useState(defaultSize.width);

    /**
     * @type minesPercent {int} input field for percentage of cells to have mines
     */
    const [minesPercent, setMinesPercent] = useState(defaultSize.minesPercent);

    /**
     * sets the selected values as new game size
     */
    const selectGameSize = () => {
        const newSize = {
            sizeX: width,
            sizeY: height,
            mines: Math.max(1, Math.floor((width * height * minesPercent) / 100 )),
        };
        setGameSize(newSize);
        setScreen(SCREENS.GAME);
    }

    return (
        <div className='flex flex-col w-[80vw] max-w-[700px]'>
            {/* back link at top of the page */}
            <button
                className='flex felx-row justify-left items-center gap-3'
                onClick={() => setScreen(SCREENS.GAME)}
            >
                <BsArrowLeft />
                Back
            </button>

            <h1 className='text-center font-extrabold text-4xl text-lime-900'>Select Game Size</h1>

            <div className='flex-1 flex justify-center items-center p-5 w-full'>
                <div className='flex flex-col gap-1 w-72'>
                    <NumberSelector
                        label="Width"
                        min={2}
                        max={50}
                        defaultValue={defaultSize.width}
                        onChange={setWidth}
                    />
                    <NumberSelector
                        label="Height"
                        min={2}
                        max={50}
                        defaultValue={defaultSize.height}
                        onChange={setHeight}
                    />
                    <NumberSelector
                        label="Percent mines"
                        min={2}
                        max={90}
                        defaultValue={defaultSize.minesPercent}
                        onChange={setMinesPercent}
                    />
                    <button
                        className='border border-stone-400 rounded-xl bg-green-600 hover:bg-green-800 p-0.5 text-white
                        hover:shadow hover:shadow-amber-500'
                        onClick={selectGameSize}
                    >
                        Play Game
                    </button>
                    <button
                        className='border border-stone-400 rounded-xl bg-stone-200 hover:bg-stone-300 p-0.5'
                        onClick={() => setScreen(SCREENS.SIZE)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomSizeScreen;
