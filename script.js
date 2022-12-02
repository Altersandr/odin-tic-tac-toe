const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const restartBtn = document.querySelector(".btn");
const display = document.querySelector("#display");

const modalOnLoad = document.querySelector(".modalonload");
const btnPVP = document.querySelector(".btnPVP");
const btnPVE = document.querySelector(".btnPVE");
const changeBtn = document.querySelector(".changemode");


const findCell = function(){
    for(let i = 0; i< 50; i++){
        const randomSpot = Math.floor(Math.random()*9)
        if(Gameboard.board[randomSpot]=== " "){
            Gameboard.board[randomSpot]="O";
            Gameboard.renderBoard()
            const nextPlayer = Gameboard.currentPlayer();
            Gameboard.checkWinner(nextPlayer)
            
                return}
    }
}

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

const openModalOnLoad = function () {
    modalOnLoad.classList.remove("hidden");
    overlay.classList.remove("hidden");
    Gameboard.gameOn();

  };

const restartGame = function () {
    modalOnLoad.classList.add("hidden");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    Gameboard.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    Gameboard.players.p1.turn = 1;
    Gameboard.players.p2.turn = 2;
    Gameboard.players.ai.turn = 2;

    if(this.classList == "btnPVE" || this.classList =="btn"){
        console.log(this)
        console.log(Gameboard.opponent)
        Gameboard.opponent ="AI";
    }else{
        Gameboard.opponent = null;
    }
    
    Gameboard.gameOn();

  };

restartBtn.addEventListener("click", restartGame);
btnPVP.addEventListener("click", restartGame);
btnPVE.addEventListener("click", restartGame);
changeBtn.addEventListener("click", openModalOnLoad);

window.setTimeout(openModalOnLoad, 500);

const drawEvent = function(){
    const id = this.dataset.id;
    if(Gameboard.board[id] != " "){
        alert("That cell is already occupied");
        
    }else{
        const nextPlayer = Gameboard.currentPlayer();
     Gameboard.board[id] = nextPlayer;
    Gameboard.renderBoard();
    Gameboard.checkWinner(nextPlayer);
   
    };
    if(Gameboard.opponent ==="AI"){
        setTimeout(findCell, 100)
        Gameboard.renderBoard()
        Gameboard.checkWinner()
        
    }
};

const Gameboard = {
    
    board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],

    opponent: null,

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
            cell.addEventListener('click', drawEvent)})
        },

    currentPlayer: function(){
        if (this.players.p1.turn < this.players.p2.turn||this.players.p1.turn < this.players.ai.turn){
            this.players.p1.turn++
            if(this.opponent === "AI"){
                this.players.ai.turn++
            }
            return "X"
        }else{
            this.players.p2.turn++
            return "O"
        }
    },
    checkWinner: function(nextPlayer){
        const board = this.board;
        if(!(this.players.p1.turn <4)){
            if(this.board.includes(' ')){
                if(    board[0]===board[1]&&board[1]===board[2]&&board[0]!=' '
                    || board[3]===board[4]&&board[4]===board[5]&&board[3]!=' '
                    || board[6]===board[7]&&board[7]===board[8]&&board[6]!=' '
                    || board[0]===board[3]&&board[3]===board[6]&&board[0]!=' '
                    || board[1]===board[4]&&board[4]===board[7]&&board[1]!=' '
                    || board[2]===board[5]&&board[5]===board[8]&&board[2]!=' '
                    || board[0]===board[4]&&board[4]===board[8]&&board[0]!=' '
                    || board[2]===board[4]&&board[4]===board[6]&&board[2]!=' '
                    ){
                   
                    openModal()
                    display.innerHTML = `The Winner is ${nextPlayer}`
            }
        }else{
            openModal()
            display.innerHTML = 'It\'s a tie!'
                }}

    },
    
    gameOn: function(){
        this.renderBoard()
        this.bindEvents()
    },

}

Gameboard.gameOn()

