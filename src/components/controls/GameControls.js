import MinesCounter from "./MinesCounter";
import Clock from "./Clock";
import ControlActions from "./ControlActions";
import {useGameContext} from "../../state/GameState";

/**
 * Renders the side/bottom menu with the game's information and control buttons
 * @returns {JSX.Element}
 * @constructor
 */
const GameControls = () => {
    const {game} = useGameContext();
    return (
        <div
            className="flex flex-col justify-between bg-sky-50/50 p-5 rounded-2xl"
        >
            <div className='flex flex-row sm:flex-col justify-between'>
                <MinesCounter game={game} />
                <Clock game={game} />
            </div>
            <ControlActions />
        </div>
    );
}

export default GameControls;
