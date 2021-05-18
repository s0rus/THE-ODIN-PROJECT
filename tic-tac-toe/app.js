const manageSign = (() => {
    //the opposite sign of this one starts!
    let _sign = 'O';

    const getSign = () => {
        if (_sign === 'X') {
            _sign = 'O';
            return 'O'
        } else {
            _sign = 'X';
            return 'X';
        }
    }

    return {
        getSign
    };
})();

const winChecker = (() => {

    const _checkRows = (cg) => {
        if (((cg[0] + cg[1] + cg[2]) === 3) || ((cg[3] + cg[4] + cg[5]) === 3) || ((cg[6] + cg[7] + cg[8]) === 3)) {
            return {
                winner: 'X'
            }
        } else if (((cg[0] + cg[1] + cg[2]) === -3) || ((cg[3] + cg[4] + cg[5]) === -3) || ((cg[6] + cg[7] + cg[8]) === -3)) {
            return {
                winner: 'O'
            }
        } else {
            return false;
        }
    }

    const _checkColumns = (cg) => {
        if (((cg[0] + cg[3] + cg[6]) === 3) || ((cg[1] + cg[4] + cg[7]) === 3) || ((cg[2] + cg[5] + cg[8]) === 3)) {
            return {
                winner: 'X'
            }
        } else if (((cg[0] + cg[3] + cg[6]) === -3) || ((cg[1] + cg[4] + cg[7]) === -3) || ((cg[2] + cg[5] + cg[8]) === -3)) {
            return {
                winner: 'O'
            }
        } else {
            return false;
        }
    }

    const _checkDiagonals = (cg) => {
        if (((cg[0] + cg[4] + cg[8]) === 3) || ((cg[2] + cg[4] + cg[6]) === 3)) {
            return {
                winner: 'X'
            }
        } else if (((cg[0] + cg[4] + cg[8]) === -3) || ((cg[2] + cg[4] + cg[6]) === -3)) {
            return {
                winner: 'O'
            }
        } else {
            return false;
        }
    }


    const checkForWinner = (currentGrid) => {
        let _winnerRows = _checkRows(currentGrid);
        console.log(currentGrid);
        if (!_winnerRows) {
            let _winnerColumns = _checkColumns(currentGrid);
            if (!_winnerColumns) {
                let _winnerDiagonals = _checkDiagonals(currentGrid);
                return _winnerDiagonals ? _winnerDiagonals : false;
            } else {
                return _winnerColumns
            }
        } else {
            return _winnerRows;
        }
    }

    const checkForDraw = (currentGrid) => {
        return currentGrid.every((element) => element != null);
    }

    return {
        checkForWinner,
        checkForDraw
    };
})();

const gameGrid = (() => {
    let _gridArray = Array.from({
        length: 9
    }, (v, i) => v = null);

    const _setupButtons = () => {
        [...document.querySelectorAll('.game-button')].forEach(button => {
            button.textContent = '';
            button.disabled = false;
            button.addEventListener('click', (e) => {
                _insertSign(e.target);
            })
        })
    }

    _setupButtons();

    const _gameOver = (winner) => {
        [...document.querySelectorAll('.game-button')].forEach(button => {
            button.setAttribute('disabled', 'true')
        });

        const container = document.getElementById('container');
        const winnerContainer = document.createElement('div');
        winnerContainer.id = 'winner-container'

        container.appendChild(winnerContainer);

        const winnerHeader = document.createElement('h2');
        winnerHeader.textContent = winner.winner != 'draw' ? `The ${winner.winner} symbol has won!` : `It's a draw!`;
        winnerContainer.appendChild(winnerHeader);

        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'PLAY AGAIN';
        playAgainButton.id = 'play-again';

        winnerContainer.appendChild(playAgainButton);
        playAgainButton.addEventListener('click', () => resetGrid());

    }

    const _insertSign = (target) => {
        const targetIndex = target.getAttribute('data-index');

        currSign = `${manageSign.getSign()}`;

        _gridArray[targetIndex] = currSign === 'X' ? 1 : -1;

        target.textContent = currSign;
        target.disabled = true;

        winner = winChecker.checkForWinner(_gridArray);

        if (winner) {
            _gameOver(winner);
        } else {
            if (winChecker.checkForDraw(_gridArray)) {
                _gameOver({
                    winner: 'draw'
                });
            }
        }
    }

    const resetGrid = () => {
        location.reload();
    }

    return {
        resetGrid
    };
})();

document.getElementById('play-again').addEventListener('click', (e) => {
    gameGrid.resetGrid();
})