class Labyrinth {
    constructor(fieldLength) {
        this.fieldLength = fieldLength;
        this.init();
    }

    init() {
        this.createField(this.fieldLength);
    }

    createField(n) {
        let colLabels, rowLabels;
        colLabels = rowLabels = Array(n).fill(1).map((_, index) => index + 1);
        
        this.drawCells(rowLabels, colLabels);
        this.displayStartPosition(rowLabels, colLabels);
    }

    drawCells(rows, cols) {
        const field = document.querySelector('.app__field');
        field.style.gridTemplateColumns = `repeat(${this.fieldLength}, 1fr)`;

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < cols.length; j++) {
                let cell = document.createElement('div');
                cell.setAttribute('data-row', rows[i]);
                cell.setAttribute('data-column', cols[j]);
                cell.className = 'app__cell';

                field.appendChild(cell);
            }
        }
    }

    getRandomNumberForFieldLength() {
        return Math.floor(Math.random() * this.fieldLength) + 1;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    displayStartPosition(rows, cols) {
        const position = this.getStartPosition(rows, cols);

        this.drawStartPosition(position);

        const moves = this.getValidMoves(position);
        this.displayMoves(moves);
        this.showMarkerInRightPosition(moves.validMoves.pop());
    }

    displayMoves(moves) {
        const movesContainer = document.querySelector('.app__moves');
        moves.movesForDisplay.forEach((move, index) => {
            setTimeout(function() {
                movesContainer.innerHTML += `<div class="app__move">${move}</div>`;
            }, (index + 1) * 500);
        });
        console.log(moves.validMoves);
    }

    showMarkerInRightPosition(rightPosition) {
        document.querySelector(`.app__cell[data-row="${rightPosition.row}"][data-column="${rightPosition.column}"]`).innerHTML = "answer";
    }

    getStartPosition(rows, cols) {
        const rowStart = this.getRandomNumberForFieldLength();
        const colStart = this.getRandomNumberForFieldLength();

        return {
            row: rowStart,
            column: colStart
        }
    }

    drawStartPosition(position) {
        document.querySelector(`.app__cell[data-row="${position.row}"][data-column="${position.column}"]`).innerHTML = "start";
    }

    getValidMoves(position) {
        const validMoves = [];
        const movesForDisplay = [];
        const moves = {
            1: '↑',
            2: '↓',
            3: '←',
            4: '→'
        };
        const limit = {
            min: 1,
            max: this.fieldLength
        };

        let currentPosition = position;
        //console.log('current position start: ', currentPosition);

        while (validMoves.length < 10) {
            const randomNumber = this.getRandomNumber(1, 4);
            //console.log('current position: ', currentPosition);
            switch(randomNumber) {
                case 1:
                    if (currentPosition.row - 1 >= limit.min) {
                        currentPosition.row = currentPosition.row - 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
                    break;
                case 2:
                    if (currentPosition.row + 1 <= limit.max) {
                        currentPosition.row = currentPosition.row + 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
                    break;
                case 3:
                    if (currentPosition.column - 1 >= limit.min) {
                        currentPosition.column = currentPosition.column - 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
                    break;
                case 4:
                    if (currentPosition.column + 1 <= limit.max) {
                        currentPosition.column = currentPosition.column + 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
            }
        }

        //console.log('final moves: ', validMoves);
        //console.log('final moves for display: ', movesForDisplay);

        return {
            validMoves,
            movesForDisplay
        }
    }
}

const labyrinth = new Labyrinth(3);