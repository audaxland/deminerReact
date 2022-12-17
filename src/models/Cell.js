/**
 * @type CELL_VALUE_* {number|string} types of cells on the game board
 */
export const CELL_VALUE_0 = 0;
export const CELL_VALUE_1 = 1;
export const CELL_VALUE_2 = 2;
export const CELL_VALUE_3 = 3;
export const CELL_VALUE_4 = 4;
export const CELL_VALUE_5 = 5;
export const CELL_VALUE_6 = 6;
export const CELL_VALUE_7 = 7;
export const CELL_VALUE_8 = 8;
export const CELL_VALUE_INITIAL = 'initial';
export const CELL_VALUE_FLAG = 'flag';
export const CELL_VALUE_FALSE_FLAG = 'falseFlag';
export const CELL_VALUE_MINE = 'mine';
export const CELL_VALUE_MINE_EXPLODED = 'mineExploded';

/**
 * An individual cell on the game board
 */
class Cell
{
    /**
     * @param x {int} horizontal position of the cell
     * @param y {int} vertical position of the cell
     */
    constructor(x, y) {
        /**
         * @type {Number} horizontal position of the cell
         */
        this.x = x;

        /**
         * @type {Number} vertical position of the cell
         */
        this.y = y;

        /**
         * @type {string} type of cell in its current state
         */
        this.value = CELL_VALUE_INITIAL;

        /**
         * @type {boolean} flag to identify if there is a mine on this cell
         */
        this.hasMine = false;

        /**
         * @type {boolean} flag to identify the played state of this cell
         */
        this.isPlayed = false;
    }

    /**
     * set the cell as having a mine
     */
    setMine() {
        this.hasMine = true;
    }

    /**
     * Change the state of the cell
     * @param value {string|number} new state of the cell
     */
    setValue(value) {
        this.value = value;
    }
}

export default Cell;
