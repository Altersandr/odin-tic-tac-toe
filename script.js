const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const restartBtn = document.querySelector(".btn");
const display = document.querySelector("#display");

const modalOnLoad = document.querySelector(".modalonload");
const btnPVP = document.querySelector(".btnPVP");
const btnPVE = document.querySelector(".btnPVE");



const findCell = function(){
    for(let i = 0; i< 100; i++){
        const randomSpot = Math.floor(Math.random()*9)
        if(Gameboard.board[randomSpot]=== " "){
            Gameboard.board[randomSpot]="O";
            Gameboard.renderBoard()
            Gameboard.checkWinner("O")
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
  };

const restartGame = function () {
    modalOnLoad.classList.add("hidden");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    Gameboard.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    Gameboard.players.p1.turn = 1;
    Gameboard.players.p2.turn = 2;
    Gameboard.opponent = null;
    if(this.classList == "btnPVE"){
        Gameboard.opponent = "AI";
    }else{
        Gameboard.opponent = null;
    }

    Gameboard.gameOn();

  };

restartBtn.addEventListener("click", restartGame);
btnPVP.addEventListener("click", restartGame);
btnPVE.addEventListener("click", restartGame);

window.setTimeout(openModalOnLoad, 500);

const drawEvent = function(){
    if(Gameboard.opponent ==="AI"){
        setTimeout(findCell, 50)
        Gameboard.renderBoard()
        Gameboard.checkWinner()
    }
    const id = this.dataset.id;
    if(Gameboard.board[id] != " "){
        alert("That cell is already occupied");
    }else{
        const nextPlayer = Gameboard.draw();
     Gameboard.board[id] = nextPlayer;
    Gameboard.renderBoard();
    Gameboard.checkWinner(nextPlayer);
    };
};
// };

const Gameboard = {
    
    board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],

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
            },
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


// findCell()
