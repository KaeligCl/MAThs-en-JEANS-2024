let gameBoard = Array(11).fill('');
let turnBoard = Array(11).fill('0');
let indicBoard = Array(11).fill('');
let lastMove = -2;
let turn = 0;
let invert_turn = 1;
let game = true;
let color = "";
let board = 600
const buttonR = document.getElementById("colorR");
const buttonV = document.getElementById("colorV");
const buttonJ = document.getElementById("colorJ");
const buttonB = document.getElementById("colorB");
buttonR.style.background = '#ffffff';
buttonV.style.background = '#ffffff';
buttonJ.style.background = '#ffffff';
buttonB.style.background = '#ffffff';

function setColorV(){
    if (game == true){
        color = "V";
        buttonR.style.background = '#ffffff';
        buttonV.style.background = '#6f6f6f';
        buttonJ.style.background = '#ffffff';
        buttonB.style.background = '#ffffff';
    }
}
function setColorR(){
    if (game == true){
        color = "R";
        buttonR.style.background = '#6f6f6f';
        buttonV.style.background = '#ffffff';
        buttonJ.style.background = '#ffffff';
        buttonB.style.background = '#ffffff';
    }
}

function setColorJ(){
    if (game == true){
        color = "J";
        buttonR.style.background = '#ffffff';
        buttonV.style.background = '#ffffff';
        buttonJ.style.background = '#6f6f6f';
        buttonB.style.background = '#ffffff';
    }
}
function setColorB(){
    if (game == true){
        color = "B";
        buttonR.style.background = '#ffffff';
        buttonV.style.background = '#ffffff';
        buttonJ.style.background = '#ffffff';
        buttonB.style.background = '#6f6f6f';
    }
}

function updateGameBoard() {
    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = '';

    const box = document.getElementById('box');
    
    for (let i = 0; i < gameBoard.length; i++) {
        //creer une cellule
        const cell = document.createElement('button');
        // nomme la cellule
        cell.className = 'cell'+ String([i + 1]);
        cell.onclick= function() {makeMove(this);};
        
        cell.style.width = Math.trunc(board/11);
        cell.style.height = box.style.height;
        // actualise la valeur de la cellule
        cell.textContent = String(gameBoard[i]);
        // griser les cases adjacente au coup du joueur 1
        if (gameBoard[i] == 'n'){
            cell.style.backgroundColor = '#a5a5a5';
            cell.innerHTML = '';
        }
        // met la couleur dans la case
        if (turnBoard[i] == 0){
            if (gameBoard[i] == 'V'){
                cell.style.backgroundImage = "url('cases/case_vB.png')";
            }
            if (gameBoard[i] == 'R'){
                cell.style.backgroundImage = "url('cases/case_rB.png')";
            }
            if (gameBoard[i] == 'J'){
                cell.style.backgroundImage = "url('cases/case_jB.png')";
            }
            if (gameBoard[i] == 'B'){
                cell.style.backgroundImage = "url('cases/case_bB.png')";
            }
            gameBoardElement.appendChild(cell);
        }
        if (turnBoard[i] == 1){
            if (gameBoard[i] == 'V'){
                cell.style.backgroundImage = "url('cases/case_vG.png')";
            }
            if (gameBoard[i] == 'R'){
                cell.style.backgroundImage = "url('cases/case_rG.png')";
            }
            if (gameBoard[i] == 'J'){
                cell.style.backgroundImage = "url('cases/case_jG.png')";
            }
            if (gameBoard[i] == 'B'){
                cell.style.backgroundImage = "url('cases/case_bG.png')";
            }
            gameBoardElement.appendChild(cell);
        }
    }
}
function placeAdjacent(place){
    if (gameBoard[place-1] == 0){
        gameBoard[place-1] = 'n';
    }
    if (gameBoard[place+1] == 0){
        gameBoard[place+1] = 'n';
    }
}
function delAdjacent(place){
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] == 'n'){
            gameBoard[i] = '';
        }
    }
}

function updateIndicBoard(place) {
    const indicBoardElement = document.getElementById('indice-board');
    indicBoardElement.innerHTML = '';

    for (let i = 0; i < gameBoard.length; i++) {
        //creer une cellule
        const indic = document.createElement('div');
        indic.className = 'indice';
        indic.textContent = i+1;
        if (i == place){
            indic.style.color = '#ff6944';
        }
        indicBoardElement.appendChild(indic);
    }
}

function makeMove(clickedButton) {
    if (game == true){
        const resultElement = document.getElementById('result');
        const place = parseInt(clickedButton.className.replace('cell', '')) - 1;
        if (turn == 0){
            if (['V', 'R', 'J', 'B'].includes(color)) {
                if (gameBoard[place] == 0){
                    gameBoard[place] = color;
		            turnBoard[place] = turn;
                    placeAdjacent(place);
                    updateGameBoard();
                    updateIndicBoard(place);
                    checkGameResult();
                    switchTurn();
                    return;
                }
            }else {resultElement.textContent = 'J1: Cliquez sur 1 des 4 bouttons V / R / J / B, puis rééssayer'}
        }
        if (turn == 1){
            if (['V', 'R', 'J', 'B'].includes(color)){ 
                if (gameBoard[place] == 0){
                    gameBoard[place] = color;
		            turnBoard[place] = turn;
                    delAdjacent(place);
                    updateGameBoard();
                    updateIndicBoard(-1);
                    checkGameResult();
                    switchTurn();
                    return;
                }
            }
        }
    }
}

function switchTurn() {
    turn = 1 - turn; // Toggle between 0 and 1
    invert_turn = 1 - invert_turn; // Toggle between 0 and 1
}

function checkGameResult() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Player ${invert_turn+1} turn`;

    for (let i = 0; i <= gameBoard.length - 4; i++) {
        const main = [gameBoard[i], gameBoard[i + 1], gameBoard[i + 2], gameBoard[i + 3]];

        if (main.includes('R') && main.includes('V') && main.includes('B') && main.includes('J')) {
            resultElement.textContent = 'Player 1 wins!';
            game = false;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        resultElement.textContent = 'Player 2 wins!';
        game = false;
        return;
    }
}

updateIndicBoard();
updateGameBoard();

function playAgain() {
    //var resultat = confirm("Voulez-vous jouer à nouveau ?");

    //if (resultat) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = 'Player 1 turn';

        gameBoard = Array(11).fill('');
        indicBoard = Array(11).fill('');
        lastMove = -2;
        turn = 0;
        invert_turn = 1;
        game = true;
        color = "";
        buttonR.style.background = '#ffffff';
        buttonV.style.background = '#ffffff';
        buttonJ.style.background = '#ffffff';
        buttonB.style.background = '#ffffff';
        updateIndicBoard();
        updateGameBoard();
    //}
}

let visibl = 0
function showHide(){
    if (visibl == 0){
        const text = document.getElementById('text');
        text.style.display = 'none';
        
        const box = document.getElementById('box');
        box.style.width = '1200px';
        box.style.height = '100px';
        board = 1200;
    }
    if (visibl == 1){
        const text = document.getElementById('text');
        text.style.display = 'block';
        box.style.width = '600px';
        box.style.height = '50px';
        board = 600;
    }

    visibl = 1 - visibl

}