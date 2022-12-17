import {BsFlagFill} from "react-icons/bs";
import ControlInfo from "./ControlInfo";

/**
 * Renders the number of flags on the game
 * @param game {Game} instance of the game
 * @returns {JSX.Element}
 * @constructor
 */
const MinesCounter = ({game}) => {
    return (
        <ControlInfo
            icon={<BsFlagFill />}
            value={`${game.flaggedCells}/${game.mines}`}
        />
    );
}

export default MinesCounter;
