const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const restartBtn = document.querySelector(".btn");
const display = document.querySelector("#display");

const modalOnLoad = document.querySelector(".modalonload");
const btnPVP = document.querySelector(".btnPVP");
const btnPVE = document.querySelector(".btnPVE");




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
    Gameboard.board = ["", "", "", "", "", "", "", "", ""];
    if(this.classList = "btnPVE"){
        Gameboard.opponent = "AI";
    }

    Gameboard.gameOn();

  };

restartBtn.addEventListener("click", restartGame);
btnPVP.addEventListener("click", restartGame);
btnPVE.addEventListener("click", restartGame);

window.setTimeout(openModalOnLoad, 500);


const drawEvent = function(){
    const id = this.dataset.id;
    if(Gameboard.board[id] != ""){
        alert("That cell is already occupied");
    }else{
        if(this.opponent = "AI" || this.players.p1.turn > this.players.ai.turn){
            Gameboard.players.ai.turn++;
            const nextPlayer = "O";
            let nextMove = Gameboard.players.ai.makeTurn();
            if(Gameboard.board[nextMove]!=""){
                nextMove = Gameboard.players.ai.makeTurn();
            }
            Gameboard.board[nextMove] = nextPlayer;
            Gameboard.renderBoard();
            Gameboard.checkWinner(nextPlayer);
        }else{
        const nextPlayer = Gameboard.draw();
     Gameboard.board[id] = nextPlayer;
    Gameboard.renderBoard();
    Gameboard.checkWinner(nextPlayer);
    };
};
};

const Gameboard = {
    
    board: ["", "", "", "", "", "", "", "", ""],

    winner: null,

    opponent: null,

    players: {
        p1: {
            name: '',
            turn: 1,
            // score: 0,
        },
        p2: {
            name: "",
            turn: 2,
            // score: 0,
        },
        ai: {
            name: "",
            turn: 2,
            makeTurn: function(){
            const randomSpot = Math.floor(Math.random()*9)
            return randomSpot
            },
            // score: 0,
        }
    },
    
    renderBoard: function (){
        this.board.forEach(cell=>{
            for (let i = 1; i < 10 ;i++){
            const cell = document.querySelector(`.cell${i}`);
            cell.firstChild.innerHTML = this.board[i-1]
            }})},
            
    bindEvents: function (){
        // console.log(this)
        const cells = document.querySelectorAll('.cells');
        cells.forEach(cell=>{
            cell.addEventListener('click', drawEvent)})
        },

    draw: function(){
        if (this.players.p1.turn < this.players.p2.turn||this.players.p1.turn < this.players.ai.turn){
            this.players.p1.turn++
            return "X"
        }else{
            this.players.p2.turn++
            return "O"
        }
    },
    checkWinner: function(nextPlayer){
        const board = this.board;
        if(!(this.players.p1.turn <4)){
            if(this.board.includes('')){
                if(    board[0]===board[1]&&board[1]===board[2]&&board[0]!=''
                    || board[3]===board[4]&&board[4]===board[5]&&board[3]!=''
                    || board[6]===board[7]&&board[7]===board[8]&&board[6]!=''
                    || board[0]===board[3]&&board[3]===board[6]&&board[0]!=''
                    || board[1]===board[4]&&board[4]===board[7]&&board[1]!=''
                    || board[2]===board[5]&&board[5]===board[8]&&board[2]!=''
                    || board[0]===board[4]&&board[4]===board[8]&&board[0]!=''
                    || board[2]===board[4]&&board[4]===board[6]&&board[2]!=''
                    ){
                    this.winner = nextPlayer
                    openModal()
                    display.innerHTML = `The Winner is ${nextPlayer}`
                    console.log(`Winner is ${nextPlayer}`)
            
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

console.log(Gameboard.players.ai.makeTurn())