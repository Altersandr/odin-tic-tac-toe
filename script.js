const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const restartBtn = document.querySelector(".btn");
const display = document.querySelector("#display");

const modalOnLoad = document.querySelector(".modalonload");
const btnPVP = document.querySelector(".btnPVP");
const btnPVE = document.querySelector(".btnPVE");
const changeBtn = document.querySelector(".changemode");


const aiMove = function(){
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

  };

const restartGame = function () {
    modalOnLoad.classList.add("hidden");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    Gameboard.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    Gameboard.players.p1.turn = 1;
    Gameboard.players.p2.turn = 2;
    Gameboard.players.ai.turn = 2;
    // Gameboard.opponent = null;
    if(this.classList == "btnPVE" || this.classList == "btn" && Gameboard.opponent =="AI"){
        Gameboard.opponent ="AI";
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

//player move
const playerMove = function (){ 
    const cellId = this.dataset.id;
    const gameboard = Gameboard.board;
    let currentPlayer = 'X';
    if (gameboard[cellId] != " "){
        alert("That cell is already occupied");
        return
    }
    if(Gameboard.players.p1.turn<Gameboard.players.p2.turn||Gameboard.players.p1.turn<Gameboard.players.ai.turn){
        gameboard[cellId]  = "X";
        Gameboard.players.p1.turn++
        Gameboard.checkWinner("X");
        
        
    }else{
        if(Gameboard.opponent!='AI'){
        gameboard[cellId]  = "O";
        Gameboard.players.p2.turn++
        Gameboard.checkWinner("O");
    }
    }
    if(Gameboard.opponent=='AI'){

        Gameboard.bestMove()
        // setTimeout(aiMove(), 200)
        Gameboard.checkWinner("O")
        // currentPlayer = "O"
        Gameboard.players.ai.turn++

    }
    // currentPlayer = "X"
    // Gameboard.checkWinner(currentPlayer)
    Gameboard.renderBoard();
    // aiMove() 
};
// const drawEvent = function(){
//     const nextPlayer = Gameboard.currentPlayer()
//     const id = this.dataset.id;
//     if(Gameboard.board[id] != " "){
//         alert("That cell is already occupied");
//         return
        
//     }else{
//         // const nextPlayer = Gameboard.currentPlayer();
//         Gameboard.board[id] = nextPlayer;
//         //  console.log(nextPlayer)
//         // Gameboard.checkWinner(nextPlayer);
//         // Gameboard.renderBoard();
//     }
//     if(Gameboard.opponent ==="AI"){
//         const nextPlayer = "O";
//         setTimeout(findCell, 100)
//         // Gameboard.renderBoard()
//         // console.log(nextPlayer)
//         Gameboard.checkWinner(nextPlayer)
//         Gameboard.renderBoard()
        
//     }else{
//     Gameboard.checkWinner(nextPlayer)
//     Gameboard.renderBoard()}
//     // console.log(nextPlayer)
//     // console.log(Gameboard.checkWinner(nextPlayer))
//     // Gameboard.checkWinner(nextPlayer)
// };

const Gameboard = {
    
    board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],

    opponent: null,

    winner: null,

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



    // currentPlayer: function(){
    //     if (this.players.p1.turn < this.players.p2.turn||this.players.p1.turn < this.players.ai.turn){
    //         this.players.p1.turn++
    //         if(this.opponent === "AI"){
    //             this.players.ai.turn++
    //             // return "X"
    //         }
    //         return "X"
    //     }else{
    //         this.players.p2.turn++
    //         return "O"
    //     }
    // },




    checkWinner: function(nextPlayer){
        const board = this.board;
        if(!(this.players.p1.turn <4)){
            if(board.includes(' ')||this.winner==null){
                if(    board[0]===board[1]&&board[1]===board[2]&&board[0]!=' '
                    || board[3]===board[4]&&board[4]===board[5]&&board[3]!=' '
                    || board[6]===board[7]&&board[7]===board[8]&&board[6]!=' '
                    || board[0]===board[3]&&board[3]===board[6]&&board[0]!=' '
                    || board[1]===board[4]&&board[4]===board[7]&&board[1]!=' '
                    || board[2]===board[5]&&board[5]===board[8]&&board[2]!=' '
                    || board[0]===board[4]&&board[4]===board[8]&&board[0]!=' '
                    || board[2]===board[4]&&board[4]===board[6]&&board[2]!=' '
                    ){
                        //to be changed back
                        console.log(nextPlayer)
                        return nextPlayer;
                    display.innerHTML = `The Winner is ${this.winner}`
                    openModal()
            }
        }else{
            return "tie"
            openModal()
            display.innerHTML = 'It\'s a tie!'
                }}

    },
    
    gameOn: function(){
        this.renderBoard()
        this.bindEvents()
    },

    bestMove: function(){
        let topScore = -Infinity;
        let move;
        let board = this.board
    for (let i = 1; i < 10 ;i++){
        if(board[i]== " "){
            board[i] == "O";
            let score = this.minimax(board, 0, false);
            board[i] = "";
            if (score > topScore){
                topScore = score;
                move = i;
            }
        }
    }
    board[i]= "O";
    this.currentPlayer = "X";
    },

    scores: {
        X: 1,
        O: -1,
        tie: 0
    },

    currentPlayer: "O",

    minimax: function(board, depth, isMaximizing){
        let result = this.checkWinner();
        if(result!= null){
            return scores[result]
        }

        if(isMaximizing){
            let topScore = -Infinity;
            for(let i = 0; i<10; i++){
                if (board[i] == " "){
                    board[i] == "O";
                    let score = this.minimax(board, depth+1, false);
                    board[i]= ' ';
                    topScore = max(score, topScore);
                }
            }return topScore;

        }else{
            let topScore = Infinity;
            for(let i = 0; i<10; i++){
                if (board[i] == " "){
                    board[i] == "X";
                    let score = this.minimax(board, depth+1, true);
                    board[i]= ' ';
                    topScore = min(score, topScore);
        }
    }return topScore;
    
        }
        }
    }

    Gameboard.gameOn()


