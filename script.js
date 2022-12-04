const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const restartBtn = document.querySelector(".btn");
const display = document.querySelector("#display");

const modalOnLoad = document.querySelector(".modalonload");
const btnPVP = document.querySelector(".btnPVP");
const btnPVE = document.querySelector(".btnPVE");
const changeBtn = document.querySelector(".changemode");

const selection = document.querySelector("#difficulty")

const easyAiMove = function(){
    for(let i = 0; i< 20; i++){
        const randomSpot = Math.floor(Math.random()*9)
        if(Gameboard.board[randomSpot]=== " "){
            Gameboard.board[randomSpot]="O";
            return
            }
    }
}

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

const openModalOnLoad = function () {
    modalOnLoad.classList.remove("hidden");
    overlay.classList.remove("hidden");
    updateDifficulty()
  };

const restartGame = function () {
    modalOnLoad.classList.add("hidden");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    Gameboard.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    Gameboard.players.p1.turn = 1;
    Gameboard.players.p2.turn = 2;
    Gameboard.players.ai.turn = 2;
    
    if(this.classList == "btnPVE" || this.classList == "btn" && Gameboard.opponent =="AI"){
        Gameboard.opponent ="AI";
        if(Gameboard.difficulty=="unbeatable"){
            Gameboard.bestMove()
        }
       
    }else if(this.classList == "btnPVP" || this.classList == "btn" && Gameboard.opponent ==null){
       
        Gameboard.opponent = null;
    }
    
    Gameboard.gameOn();

  };

restartBtn.addEventListener("click", restartGame);
btnPVP.addEventListener("click", restartGame);
btnPVE.addEventListener("click", restartGame);
changeBtn.addEventListener("click", openModalOnLoad);

window.setTimeout(openModalOnLoad, 500);



const playerMove = function (){ 
    const cellId = this.dataset.id;
    const gameboard = Gameboard.board;
    if (gameboard[cellId] != " "){
        alert("That cell is already occupied");
        return
    }
    if(Gameboard.players.p1.turn<Gameboard.players.p2.turn||Gameboard.players.p1.turn<Gameboard.players.ai.turn){
        gameboard[cellId]  = "X";
        Gameboard.players.p1.turn++
        
    }else{
        if(Gameboard.opponent!='AI'){
        gameboard[cellId]  = "O";
        Gameboard.players.p2.turn++
    }
    }
    if(Gameboard.opponent=='AI'){
        Gameboard.currentPlayer = "O";
        if(Gameboard.difficulty =="easy"){
            easyAiMove()        }
            else if(Gameboard.difficulty =="hard" ||Gameboard.difficulty =="unbeatable"){
            Gameboard.bestMove()
            }

        Gameboard.players.ai.turn++
    }
    
    let result = Gameboard.checkWinner()
    Gameboard.renderBoard();
    if(result!==null&&result!=="tie"){
        display.innerHTML = `The Winner is ${result}`
        openModal()
    }else if(result == "tie"){
        openModal()
        display.innerHTML = 'It\'s a tie!'
    }
    Gameboard.renderBoard(); 
};

const Gameboard = {
    
    board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],

    opponent: null,

    difficulty: null,

    players: {
        p1: {
            turn: 1,
        },
        p2: { 
            turn: 2,
        },
        ai: {
            turn: 2,
            },
        },
    
    
    renderBoard: function (){
        this.board.forEach(cell=>{
            for (let i = 1; i < 10 ;i++){
            const cell = document.querySelector(`.cell${i}`);
            cell.firstChild.innerHTML = this.board[i-1]
            }})},
            
    bindEvents: function (){
        
        const cells = document.querySelectorAll('.cells');
        cells.forEach(cell=>{
            cell.addEventListener('click', playerMove)})
        },


    checkWinner: function(){
        let winner = null;
        const board = this.board;
        //horizontal
            if(this.equal3(board[0], board[1], board[2])){
                winner = board[0];
            }
            else if(this.equal3(board[3], board[4], board[5])){
                winner = board[3];
            }
            else if(this.equal3(board[6], board[7], board[8])){
                winner = board[6];
            }
        //vertical
            else if(this.equal3(board[0], board[3], board[6])){
                winner = board[0];
            }
            else if(this.equal3(board[1], board[4], board[7])){
                winner = board[1];
            }
            else if(this.equal3(board[2], board[5], board[8])){
                winner = board[2];
            }
        //across
            else if(this.equal3(board[0], board[4], board[8])){
                winner = board[0];
            }
            else if(this.equal3(board[2], board[4], board[6])){
                winner = board[2];
            }
            
            let openSpots = 0;
            for (let i = 0; i < 9; i++) {
                if (board[i] == ' ') {
                    openSpots++;
                }
                }
            if (winner == null && openSpots == 0) {
                return 'tie';
              } else {
                return winner;
              }
    },

    equal3: function(a, b, c){
        return a == b && b == c && a != ' ';
    },
    
    gameOn: function(){
        this.renderBoard()
        this.bindEvents()
    },


    bestMove: function(){
        let move;
        let topScore = -Infinity;
        let board = this.board;
        
        for (let i = 0; i < 9 ;i++){
            if(board[i] ==" "){
                board[i] = "O";
                let score = this.minimax(board, 0, false);
                board[i] = " ";
                if( score > topScore){
                    topScore = score;
                    move = i;
                }
            } 
        }
        
        board[move] = "O";
        this.currentPlayer = "X"
      
        },

        minimax: function(board, depth, isMaximizing){
            let result = this.checkWinner();
            
            if(result !== undefined && result !== null){
                let score = this.scores[result];
                
                return score
            }

            if (isMaximizing){
                let topScore = -Infinity;
                for(let i = 0; i<9; i++){
                    if(board[i] ==" "){
                        board[i] = "O";
                        let score = this.minimax(board, depth+1, false);
                        board[i] = " ";
                        if (score > topScore){
                            topScore= score;
                        }
                    }
                }
                return topScore;
            }else{
                let topScore = Infinity;
                for(let i = 0; i<9; i++){
                    if(board[i] ==" "){
                        board[i] = "X";
                        let score = this.minimax(board, depth+1, true);
                        board[i] = " ";
                       if (score < topScore){
                        topScore = score;
                       }
                    }
                }
                return topScore;

            }
        },

    scores: {
        X: -10,
        O: 10,
        tie: 0,
    },

    currentPlayer: "X",
   
}

Gameboard.gameOn()



const updateDifficulty = function (){
    let difficultyValue = difficulty.value
    Gameboard.difficulty = `${difficultyValue}`;

};

difficulty.addEventListener('blur', updateDifficulty)


