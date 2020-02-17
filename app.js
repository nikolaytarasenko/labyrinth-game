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
        const validMoves = [];

        console.log(position.row)
    }

}

const labyrinth = new Labyrinth(3);