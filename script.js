//Create grid containers
const createGrid = (() => {
  let container = document.querySelector('.container');
  for (let i = 0; i < 9; i++) {
    let gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.setAttribute('id', i); // Set each grid container's id according to array position.
    container.insertAdjacentElement('beforeend', gridElement);
  }
})();

const gameBoard = (() => {
  let gameBoardArray = ['', '', '', '', '', '', '', '', ''];

  function addToArray(position, symbol) {
    gameBoardArray[position] = symbol;
  }

  function returnArray() {
    return gameBoardArray;
  }

  function clearArray() {
    for (let i = 0; i < gameBoardArray.length; i++) {
      {
        gameBoardArray[i] = '';
      }
    }
  }
  // Display the array on screen with each symbol according to its position
  function render() {
    for (let i = 0; i < gameBoardArray.length; i++) {
      const target = document.getElementById(`${i}`);
      target.textContent = gameBoardArray[i];
    }
  }

  return {
    addToArray,
    returnArray,
    clearArray,
    render,
  };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const playGame = (() => {
  //DOM
  let turnText = document.querySelector('.player-turn');
  const restartBtn = document.querySelector('.restart-button');
  const Player1 = Player('Player 1', 'X');
  const Player2 = Player('Player 2', 'O');
  let currentPlayer = Player1;
  let gameBoardArray = gameBoard.returnArray();
  let grids = document.querySelectorAll('.grid-element');
  turnText.textContent = `${Player1.name}, make your turn!`;
  let round = 0;
  let gameOver = false;

  grids.forEach((markedGrid) => markedGrid.addEventListener('click', markGrid));

  restartBtn.addEventListener('click', resetGrid);

  function resetGrid(e) {
    gameBoard.clearArray();
    gameBoard.render();
    gameOver = false;
    round = 0;
    currentPlayer = Player1;
    turnText.textContent = `${Player1.name}, make your turn!`;
  }

  function markGrid(e) {
    const idIndex = e.target.id; // sau this.id, extract grid element's ID
    if (gameBoardArray[idIndex] === '' && gameOver === false) {
      //if it's empty, you can mark it, game must not be over
      if (currentPlayer === Player1) {
        e.target.style.color = '#22d3ee';
        gameBoard.addToArray(idIndex, 'X');
        round++; //Check for winner after every marked box
        checkWinner();
        if (gameOver === false) {
          // Change player only if game is not over
          changePlayer();
        }
      } else {
        gameBoard.addToArray(idIndex, 'O');
        e.target.style.color = '#dc2626';
        round++;
        checkWinner();
        if (gameOver === false) {
          changePlayer();
        }
      }
      gameBoard.render();
    }
  }

  function checkWinner() {
    //Winning combos based on array positions
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombos.length; i++) {
      //Go through each combo
      const combo = winCombos[i];
      const a = gameBoardArray[combo[0]];
      const b = gameBoardArray[combo[1]];
      const c = gameBoardArray[combo[2]];
      //Check if there are 3 matching syombol of all possible winning combinations (based on positions)
      if (a === '' || b === '' || c === '') {
        continue;
      } else if (a === b && b === c) {
        turnText.textContent = `${currentPlayer.name}, won!`;
        gameOver = true;
        break;
      } else if (round === 9) {
        //If 9 rouds pass and there is still no winner, then it's a tie
        turnText.textContent = "It's a tie!";
        gameOver = true;
      }
    }
  }

  function changePlayer() {
    currentPlayer = currentPlayer === Player2 ? Player1 : Player2;
    turnText.textContent = `${currentPlayer.name}, make your turn!`;
  }
})();
