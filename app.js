class Labyrinth {
    constructor(fieldLength) {
        this.fieldLength = fieldLength;
        this.init();
        this.currentStartPosition = null;
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
                let cell = document.createElement('button');
                cell.setAttribute('data-row', rows[i]);
                cell.setAttribute('data-column', cols[j]);
                cell.setAttribute('disabled', 'true');
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
        let position = this.getStartPosition(rows, cols);
        this.currentStartPosition = Object.assign({}, position);

        this.drawStartPosition(position);
        const moves = this.getValidMoves(position);
        this.showMarkerInRightPosition(moves.validMoves[moves.validMoves.length - 1]);
        this.displayMoves(moves, position, moves.validMoves[moves.validMoves.length - 1]);
    }

    displayMoves(moves, startPosition, rightPosition) {
        const movesContainer = document.querySelector('.app__moves');
        const that = this;
        console.log('displayMoves: ', that.currentStartPosition);

        moves.movesForDisplay.forEach((move, index) => {
            setTimeout(function() {
                movesContainer.innerHTML += `<div class="app__move">${move}</div>`;

                if (movesContainer.children.length === 10) {
                    const cells = document.querySelector('.app__field').children;

                    for (let i = 0; i < cells.length; i++) {
                        cells[i].removeAttribute('disabled');

                        cells[i].addEventListener('click', e => that.getAnswer(e, rightPosition));
                    }
                }
            }, (index + 1) * 100);
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

        console.log('current position start (paramaetr): ', position);
        //console.log('current position start: ', currentPosition);

        const testPosition = position;
        let currentPosition = Object.assign({}, position);

        while (validMoves.length < 10) {
            const randomNumber = this.getRandomNumber(1, 4);
            //console.log('current position: ', currentPosition);
            switch (randomNumber) {
                case 1:
                    if (currentPosition.row - 1 >= limit.min) {
                        currentPosition.row = currentPosition.row - 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push(Object.assign({}, currentPosition));
                    }
                    break;
                case 2:
                    if (currentPosition.row + 1 <= limit.max) {
                        currentPosition.row = currentPosition.row + 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push(Object.assign({}, currentPosition));
                    }
                    break;
                case 3:
                    if (currentPosition.column - 1 >= limit.min) {
                        currentPosition.column = currentPosition.column - 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push(Object.assign({}, currentPosition));
                    }
                    break;
                case 4:
                    if (currentPosition.column + 1 <= limit.max) {
                        currentPosition.column = currentPosition.column + 1;
                        movesForDisplay.push(moves[randomNumber]);
                        validMoves.push(Object.assign({}, currentPosition));
                    }
            }
        }

        return {
            validMoves,
            movesForDisplay
        }
    }

    getAnswer(e, rightPosition) {
        const answerCell = e.target;
        const answerPosition = {
            row: +answerCell.getAttribute('data-row'),
            column: +answerCell.getAttribute('data-column')
        };

        const cells = document.querySelector('.app__field').children;

        for (let i = 0; i < cells.length; i++) {
            cells[i].setAttribute('disabled', 'true');
        }

        if (JSON.stringify(rightPosition) === JSON.stringify(answerPosition)) {
            answerCell.style.background = 'green';
            this.showMarkerInRightPosition(rightPosition);
        } else {
            for (let i = 0; i < cells.length; i++) {
                this.showMarkerInRightPosition(rightPosition);
                answerCell.style.background = 'red';
            }
        }
    }
}

const labyrinth = new Labyrinth(3);