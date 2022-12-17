import { BsClock } from "react-icons/bs";
import ControlInfo from "./ControlInfo";
import {useCallback, useLayoutEffect, useState} from "react";
import { formatTimeToMMSS } from "../../utils/time";

/**
 * Renders a clock with the elapsed time and an icon
 * @param game {Game} game instance
 * @returns {JSX.Element}
 * @constructor
 */
const Clock = ({game}) => {
    /**
     * @type elapsedTime {string} value rendered on the clock display, in format MM:SS
     */
    const [elapsedTime, setElapsedTime] = useState('00:00');

    /**
     * computes the currently elapsed time
     */
    const updateElapsedTime = useCallback(() => {
        const time = game.getElapsedTime();
        setElapsedTime(formatTimeToMMSS(time));
    }, [game]);

    /**
     * updates the elapsed time and sets the interval to keep the timer ticking while playing
     */
    useLayoutEffect(() => {
        updateElapsedTime();
        if (game.startTime && (!game.pauseTime) && (!game.gameOver)) {
            updateElapsedTime();
            const ticker = setInterval(updateElapsedTime, 500);
            return () => clearInterval(ticker);
        }
    }, [updateElapsedTime, game, game.startTime, game.pauseTime, game.gameOver])

    return (
        <ControlInfo
            icon={<BsClock />}
            value={elapsedTime}
        />
    );
}

export default Clock;
