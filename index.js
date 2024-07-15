const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");

let currentPlayer;
let gamegrid;
const winningposition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initiaze the game
function initgame(){
    currentPlayer = "X";
    gamegrid = ["","","","","","","","",""];

    boxes.forEach((box,index)=>{
        box.textContent = "";
        boxes[index].style.pointerEvents = "all";
       });

    boxes.forEach((box)=>{
        box.classList.remove("win");
       });

    newgamebtn.classList.remove('active');
    gameinfo.textContent = `Current player :- ${currentPlayer}` 

}
function swapturn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    gameinfo.textContent = `Current player :- ${currentPlayer}` 
}

function handleclick(index){
    if(gamegrid[index] === ""){
        boxes[index].textContent = currentPlayer;
        gamegrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapturn();
        checkgameover();
    }
}
function checkgameover(){
   let answer = "";
   winningposition.forEach((position)=>{
    if(gamegrid[position[0]]!="" && gamegrid[position[1]]!="" && gamegrid[position[2]]!="" ){
        if(gamegrid[position[0]]=== gamegrid[position[1]] && gamegrid[position[1]]=== gamegrid[position[2]] ){
            answer = gamegrid[position[0]];
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    }
    if(answer!==""){
        gameinfo.textContent = `Winner is ${answer}`; 
        newgamebtn.classList.add("active");
        boxes.forEach((box)=>{
            box.style.pointerEvents ="none";
        })
        return;
    }

    // game draw case 
    let fillcount = 0;
    gamegrid.forEach((box)=>{
        if(box !== ""){
            fillcount++;
        }
    })
    if(fillcount === 9){
        gameinfo.textContent = `Game tied !!`; 
        newgamebtn.classList.add("active");

    }

   })
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleclick(index);
    })
});
newgamebtn.addEventListener('click',initgame);




initgame();