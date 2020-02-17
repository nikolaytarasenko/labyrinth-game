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
        this.getValidMoves(position);
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
        let validMoves = [];
        const moves = {
            1: 'up',
            2: 'down',
            3: 'left',
            4: 'right'
        };
        const limit = {
            min: 1,
            max: this.fieldLength
        };

        let currentPosition = position;
        console.log('current position start: ', currentPosition);

        while (validMoves.length < 10) {
            const randomNumber = this.getRandomNumber(1, 4);
            console.log('current position: ', currentPosition);
            switch(randomNumber) {
                case 1:
                    if (currentPosition.row - 1 >= limit.min) {
                        currentPosition.row = currentPosition.row - 1;
                        console.log('up: ', currentPosition);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
                    break;
                case 2:
                    if (currentPosition.row + 1 <= limit.max) {
                        currentPosition.row = currentPosition.row + 1;
                        console.log('down: ', currentPosition);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
                    break;
                case 3:
                    if (currentPosition.column - 1 >= limit.min) {
                        currentPosition.column = currentPosition.column - 1;
                        console.log('left: ', currentPosition);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
                    break;
                case 4:
                    if (currentPosition.column + 1 <= limit.max) {
                        currentPosition.column = currentPosition.column + 1;
                        console.log('right: ', currentPosition);
                        validMoves.push( Object.assign({}, currentPosition) );
                    }
            }
        }

        console.log('final moves: ', validMoves);
    }
}

const labyrinth = new Labyrinth(3);