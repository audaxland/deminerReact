import ButtonBox from "../components/elements/ButtonBox";
import {SCREENS, useGameContext} from "../state/GameState";
import {BsArrowLeft} from "react-icons/bs";

/**
 * List of hard coded games sizes to select from
 * @type {[{sizeX: number, mines: number, sizeY: number}]}
 */
const sizes = [
    {sizeX: 8, sizeY: 8, mines: 10},
    {sizeX: 16, sizeY: 16, mines: 40},
    {sizeX: 30, sizeY: 16, mines: 99},
]

/**
 * Render the Size selection screen
 * @returns {JSX.Element}
 * @constructor
 */
const SelectSizeScreen = () => {
    /**
     * @type setScreen {function} screen setter, used to navigate between screens
     * @type setGameSize {function} sets the new game size
     */
    const { setScreen, setGameSize } = useGameContext();

    return (
        <div className='flex flex-col w-[80vw] max-w-[700px]'>
            {/* back link at the top of the page */}
            <button
                className='flex felx-row justify-left items-center gap-3'
                onClick={() => setScreen(SCREENS.GAME)}
            >
                <BsArrowLeft />
                Back
            </button>

            <h1 className='text-center font-extrabold text-4xl text-lime-900'>Select Game Size</h1>

            <div className='flex-1 grid grid-cols-2 gap-5 p-5 w-full'>
                {/* List of sizes to select from */}
                {sizes.map(({sizeX, sizeY, mines}) => (
                    <ButtonBox
                        key={sizeX + '-' + sizeY + '-' + mines}
                        text={sizeX + ' x ' + sizeY}
                        subTextBold={mines}
                        subText='mines'
                        onClick={() => {
                            setGameSize({sizeX, sizeY, mines});
                            setScreen(SCREENS.GAME);
                        }}
                    />
                ))}

                {/* Custom size button to navigate to the custom size screen */}
                <ButtonBox
                    text={ '? x ?' }
                    subText='Custom'
                    onClick={() => {
                        setScreen(SCREENS.CUSTOM);
                    }}
                />
            </div>
        </div>
    );
}

export default SelectSizeScreen;
