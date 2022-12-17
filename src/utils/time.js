/**
 * Helper function to convert seconds to the MM:SS format
 * @param time {int} number of seconds
 * @returns {string}
 */
export const formatTimeToMMSS = time => (
    (Math.floor(time / 60)).toString().padStart(2, '0') + ':' + (time % 60).toString().padStart(2, '0')
)
