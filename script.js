


// const Players = {
//     player1: {
//         turn: 1,
//         score: 0,
//     },
//     player2: {
//         turn:2,
//         score: 0,
//     }
// }


const Gameboard = {
    
    board: ["", "", "", "", "", "", "", "", ""],

    winner: null,

    players: {
        p1: {
            name: '',
            turn: 1,
            score: 0,
        },
        p2: {
            name: "",
            turn: 2,
            score: 0,
        }
    },
    
    renderBoard: function (){
        this.board.forEach(cell=>{
            for (let i = 1; i < 10 ;i++){
            const cell = document.querySelector(`.cell${i}`);
            cell.innerHTML = this.board[i-1]
            }})},
            
    bindEvents: function (){
        // console.log(this)
        const cells = document.querySelectorAll('.cells');
        cells.forEach(cell=>{
            cell.addEventListener('click', function(){
            const id = this.dataset.id;
            // console.log(id)
            if(Gameboard.board[id] != ""){
                alert("That cell is already occupied")
            }else{
                const nextPlayer = Gameboard.draw()
            Gameboard.board[id] = nextPlayer
            Gameboard.renderBoard()
            Gameboard.checkWinner(nextPlayer)
        }
            })})
        },

    draw: function(){
        if (this.players.p1.turn < this.players.p2.turn){
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
                    console.log(`Winner is ${nextPlayer}`)
            
            }
        }else{console.log('its a tie')}}

    },
    
    gameOn: function(){
        this.renderBoard()
        this.bindEvents()
    },


}


//make gameboard object

//make players object
//player object has a name and a score

//make game object

//make display object






Gameboard.gameOn()