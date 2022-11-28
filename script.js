


const Players = {
    player1: {
        turn: 1,
        score: 0,
        draw: "X"
    },
    player2: {
        turn:2,
        score: 0,
        draw: "O"
    }
}


const Gameboard = {
    
    board: ["", "", "", "", "", "", "", "", ""],
    
    renderBoard: function (){
        this.board.forEach(cell=>{
            for (let i = 1; i < 10 ;i++){
            const cell = document.querySelector(`.cell${i}`);
            cell.innerHTML = this.board[i-1]
            }})},
            
    bindEvents: function (){
        const cells = document.querySelectorAll('.cells');
        cells.forEach(cell=>{
            cell.addEventListener('click', function(e){
            e.target.innerHTML = this.draw;
            
            })})
        },

    draw: function(){
        if (Players.player1.turn < Players.player2.turn){
            Players.player1.turn++
            return "X"
        }else{
            Players.player2.turn++
            return "O"
        }

    },

    // checkTurn: function(){
    //     if (Players.player1.turn < Players.player2.turn){
    //         console.log("Player 1 should go")
    //         Players.player1.turn++
    //     }else{

    //     }
    // },    
    
    gameOn: function(){
        this.renderBoard()
        this.bindEvents()
    },


}

// console.log(Gameboard.draw())
// console.log(Gameboard.draw())
// console.log(Gameboard.draw())
// console.log(Gameboard.draw())
// console.log(Gameboard.draw())
// console.log(Gameboard.draw())
// console.log(Gameboard.draw())
// console.log(Gameboard.checkTurn())



//make gameboard object

//make players object
//player object has a name and a score

//make game object

//make display object






Gameboard.gameOn()