import Cell, {
    CELL_VALUE_FALSE_FLAG,
    CELL_VALUE_FLAG,
    CELL_VALUE_INITIAL,
    CELL_VALUE_MINE,
    CELL_VALUE_MINE_EXPLODED
} from "./Cell";

/**
 * The Game class contain the game logic and state of a current game being played, or about to be played
 */
class Game
{
    /**
     * game constructor
     * @param sizeX {int} number of cells on the horizontal scale
     * @param sizeY {int} number of cells on the vertical scale
     * @param mines {int} number of mines to place on the board
     */
    constructor({sizeX = 8, sizeY = 8, mines = 10}) {
        /**
         * @type {Number} number of cells on the horizontal scale
         */
        this.sizeX = sizeX;

        /**
         * @type {Number} number of cells on the vertical scale
         */
        this.sizeY = sizeY;

        /**
         * @type {Number} number of mines to place on the board
         */
        this.mines = mines;

        /**
         * @type {Cell[][]} state of the board cells
         */
        this.board = Array(sizeX).fill().map((_, indexX) => (
            Array(sizeY).fill().map((__, indexY) => new Cell(indexX, indexY))
        ));

        /**
         * @type {number} Count of the number of cells on the game board that have already been played
         */
        this.playedCells = 0;

        /**
         * @type {boolean} flag to store the 'gave over' state (true if the game is either won or lost)
         */
        this.gameOver = false;

        /**
         * @type {boolean} flag to store to won/not won status of the game (true only once the game is won)
         */
        this.gameWon = false;

        /**
         * @type {number|null} Timestamp of the start of the game
         */
        this.startTime = null;

        /**
         * @type {number|null} Timestamp of the time at which the game was paused, used to compute the time elapsed correction
         */
        this.pauseTime = null;

        /**
         * @type {number|null} Time is seconds to complete the game, calculated once the game is won
         */
        this.totalTime = null;

        /**
         * @type {number} Number of cells that currently have a flag
         */
        this.flaggedCells = 0;
    }

    /**
     * returns a copy of the board state, this is used to populate the react state of the game board
     * @returns {object[][]}
     */
    getBoard() {
        return this.board.map(row => row.map(cell => ({...cell})));
    }

    /**
     * The first cell played, the mines are places after the first cell played to prevent losing the came on the first move
     * @param x {int} x position of the first cell played
     * @param y {int} y position of the first cell played
     */
    startGame(x, y) {
        this.placeMines({x, y});
        this.startTime = (new Date()).getTime();
    }

    /**
     * Placing the mines on the game board
     * @param skipCell {object|null} first cell position, where to not put any mine so that the game would not be lost on the fist move
     */
    placeMines(skipCell = null) {
        let minesPlaced = 0;

        let allCells = [];
        this.board.forEach(row => {
            row.forEach(cell => {
                if (skipCell && (skipCell.x === cell.x) && (skipCell.y === cell.y)) {
                    return;
                }
                allCells.push({x: cell.x, y: cell.y});
            })
        });
        let currentIndex;
        while (allCells.length && (minesPlaced++ < this.mines)) {
            currentIndex = Math.floor(Math.random() * allCells.length);
            this.board[allCells[currentIndex].x][allCells[currentIndex].y].setMine();
            allCells.splice(currentIndex, 1);
        }
    }

    /**
     * Plays a given cell of the game board
     * @param x {int} x position of the cell to play
     * @param y {int} y position of the cell to play
     */
    play (x, y) {
        if (this.gameOver) {
            return; // this should never happen
        }

        if (!this.startTime) {
            this.startGame(x, y);
        }

        // if you click on a cell that has already been played, this means you want to autoplay the neighbouring cells
        // provided that the number of flagged neighbours match the number of mines.
        if ((this.board[x][y].value !== CELL_VALUE_INITIAL)) {
            if (Number(this.board[x][y].value)) {
                const neighbours = this.getNeighbours(x, y);
                const flagCount = neighbours.filter(({value}) => value === CELL_VALUE_FLAG).length;
                if (flagCount === Number(this.board[x][y].value)) {
                    neighbours.filter(({value}) => value === CELL_VALUE_INITIAL)
                        .forEach(cell => this.play(cell.x, cell.y));
                }
            }
            return;
        }

        // if you try to play a cell that has a mine, you loose the game
        if (this.board[x][y].hasMine) {
            this.board[x][y].setValue(CELL_VALUE_MINE_EXPLODED);
            this.endGame();
            return;
        }

        // count the mines and update the status of the cell
        const mineCount = this.countMines(x, y);
        this.board[x][y].setValue(mineCount);

        // if none of the neighbouring cells have any mines, then autoplay all the neighbouring cells
        if (mineCount === 0) {
            this.getNeighbours(x, y).forEach(({x: cellX, y: cellY}) => {
                if (this.board[cellX][cellY].value === CELL_VALUE_FLAG) {
                    this.board[cellX][cellY].setValue(CELL_VALUE_INITIAL);
                }
                this.play(cellX, cellY);
            });
        }

        // update the number of cells played and check if the game is won
        this.playedCells++;
        if (this.playedCells + this.mines === this.sizeX * this.sizeY) {
            this.gameWon = true;
            this.endGame(true);
            this.flaggedCells = this.mines;
        }
    }

    /**
     * Set a flag on a cell
     * @param x {int} x position of the cell to flag
     * @param y {int} y position of the cell to flag
     */
    flag (x, y) {
        if (this.gameOver) {
            return;
        }
        if ((this.board[x][y].value === CELL_VALUE_INITIAL) && (this.flaggedCells < this.mines)) {
            this.board[x][y].setValue(CELL_VALUE_FLAG);
            this.flaggedCells++;
        } else if (this.board[x][y].value === CELL_VALUE_FLAG) {
            this.board[x][y].setValue(CELL_VALUE_INITIAL);
            this.flaggedCells--;
        }
    }

    /**
     * count the number of mines that are neighbours of a cell
     * @param x {int} x position of the cell to check
     * @param y {int} y position of the cell to check
     * @returns {number} number of mines found
     */
    countMines(x, y) {
        return this.getNeighbours(x, y).filter(({x: cellX, y: cellY}) => (
            this.board[cellX][cellY].hasMine
        )).length
    }

    /**
     * Returns the list of neighbouring cells of a given cell
     * @param x {int} x position of the cell
     * @param y {int} y position of the cell
     * @returns {Cell[]} list of neighbouring cells
     */
    getNeighbours (x, y) {
        const neighbours = [];
        for (let cellX = Math.max(0, x - 1) ; cellX <= Math.min(this.sizeX - 1, x + 1) ; cellX++) {
            for (let cellY = Math.max(0, y - 1) ; cellY <= Math.min(this.sizeY - 1, y + 1) ; cellY++) {
                if (cellX === x && cellY === y) continue;
                neighbours.push(this.board[cellX][cellY]);
            }
        }
        return neighbours;
    }

    /**
     * Handle ending the game
     * @param won {boolean} true if the game is deemed won, false otherwise
     */
    endGame(won = false) {
        // add missing flags if won or reveal mines and false flags if lost
        this.board.forEach((row) => {
            row.forEach((cell) => {
                if ((cell.value === CELL_VALUE_INITIAL) && cell.hasMine) {
                    cell.setValue(won ? CELL_VALUE_FLAG : CELL_VALUE_MINE);
                }
                if ((cell.value === CELL_VALUE_FLAG) && (!cell.hasMine)) {
                    cell.setValue(CELL_VALUE_FALSE_FLAG);
                }
            })
        })

        // update status and total time
        this.gameOver = true;
        this.totalTime = Math.ceil(((new Date()).getTime() - this.startTime) / 1000);
    }

    /**
     * Calculates the elapsed time
     * @returns {number} number of seconds elapsed since the game was started
     */
    getElapsedTime() {
        // case game not started
        if (!this.startTime) return 0;

        // case game paused, exclude paused time
        if (this.pauseTime) {
            return Math.ceil((this.pauseTime - this.startTime) / 1000);
        }

        // normal case
        return Math.ceil(((new Date()).getTime() - this.startTime) / 1000);
    }

    /**
     * Toggle the pause status
     */
    togglePause() {
        if (this.pauseTime) {
            // change the start time so that the elapsed time would exclude paused time
            this.startTime = (new Date()).getTime() - this.pauseTime + this.startTime;
            this.pauseTime = null;
        } else {
            this.pauseTime = (new Date()).getTime();
        }
    }
}

export default Game;
