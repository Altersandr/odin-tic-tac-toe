const Gameboard = {
    
    board: ["x", "x", "x", "x", "x", "x", "x", "x", "x"],
    
    renderBoard: function (){
        this.board.forEach(cell=>{
            for (let i = 1; i < 10 ;i++){
            const cell = document.querySelector(`.cell${i}`);
            cell.innerHTML = this.board[i-1]
            }})},
            
    clickEvent: function (){
        const cells = document.querySelectorAll('.cells');
        cells.forEach(cell=>{
            cell.addEventListener('click', function(e){
            e.target.innerHTML = "O";
            })})},
    
    gameOn: function(){
        this.renderBoard()
        this.clickEvent()
    },












}


//make gameboard object

//make players object
//player object has a name and a score

//make game object

//make display object






Gameboard.gameOn()