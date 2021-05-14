document.getElementById('changeSize').addEventListener('click', () => {
    changeGrid();
})

const createGrid = (size = 16) => {
    const squareSize = (500 / size);

    const container = document.getElementById('container');
    const mainSquare = document.createElement('div');
    mainSquare.setAttribute('id', 'square');
    container.append(mainSquare);

    for (let i = 1; i <= size; i++) {
        const row = document.createElement('div');
        row.classList.add('column');
        mainSquare.append(row);
        for (let j = 1; j <= size; j++) {
            const subSquare = document.createElement('div');
            subSquare.classList.add('subSquare');
            subSquare.style.width = `${squareSize}px`;
            subSquare.style.height = `${squareSize}px`;
            subSquare.setAttribute('data-key', `${i}-${j}`);

            row.append(subSquare);
        }
    }
}

const addListeners = () => {
    const allSquares = document.getElementsByClassName('subSquare');
    [...allSquares].forEach(square => {
        square.addEventListener('mouseover', (e) => {
            changeColor(e.target.getAttribute('data-key'), randomColor());
        })
    })
}

createGrid();
addListeners();

const changeGrid = () => {
    let newSize = prompt('Type in the new size (1-64)');
    newSize = parseInt(newSize);
    if (Number.isNaN(newSize)) return false;
    if (newSize > 64) newSize = 64;
    if (newSize < 1) newSize = 1;

    const mainSquare = document.getElementById('square');
    mainSquare.remove();

    createGrid(newSize);
    addListeners();
}

const changeColor = (targetId, color) => {
    const targetSquare = document.querySelector(`.subSquare[data-key="${targetId}"]`);
    targetSquare.style.backgroundColor = `rgb(${color[0]} ,${color[1]} , ${color[2]})`;
};

const randomColor = () => {
    let colorArray = [];

    for (let i = 0; i < 3; i++) {
        colorArray.push(Math.floor(Math.random() * 255));
    }
    return colorArray;
}