let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "O"; 
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const gameMessage = () => `Player ${currentPlayer} has won!`;
const statusDisplay = document.querySelector('.game--status');
const restartButton = document.getElementById('restartButton');


//How the game gets started
document.querySelector('.game--container').addEventListener('click', chosenClickedCell); 

function chosenClickedCell(clickedCellEvent) {

    //if game is over, exit function
    if (gameActive) {

        const clickedCell = clickedCellEvent.target;

        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        //If the box already has an X or O, ignore the click
        if (gameState[clickedCellIndex] !== "") {
            return;
        }
        
        chosenCellPlayed(clickedCell, clickedCellIndex);

        //this will check for winner
        resultValidation();
    }
}

function chosenCellPlayed(clickedCell, clickedCellIndex) {

    //This will give updated state before it updates the UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function resultValidation() {

    let gameWon = false;

    //These are the possible winning combinations

    const winningCombinations = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //This will each through each combination
    for (let i = 0; i < 8; i++) {
        const winCombinations = winningCombinations[i];
        let a = gameState[winCombinations[0]];
        let b = gameState[winCombinations[1]];
        let c = gameState[winCombinations[2]];
        let d = gameState[winCombinations[3]];
        let e = gameState[winCombinations[4]];
        let f = gameState[winCombinations[5]];
        let g = gameState[winCombinations[6]];
        let h = gameState[winCombinations[7]];

        if (a === '' || b === '' || c === '' || d === '' || e === '' || f === '' || g === '' || h === '') {
            continue;
        }
        
        if (a === b && b === c) {
            gameWon = true;
            break
        }
        

    }

    if (gameWon) {
        statusDisplay.innerHTML = gameMessage();
        gameActive = false;
        return;
    } 
    
   

    //This method will switch players if there is no winner
    nextPlayer();
}

function nextPlayer() {
    
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    statusDisplay.innerHTML = currentPlayerTurn();
}  