const gameContainer = document.querySelector(".game-container");

const launchBtn = document.querySelector(".launch-btn");
const launchMenu = document.querySelector(".launch-menu");

const gameMenu = document.querySelector(".game-display");
const gameText = document.querySelector(".game-info");

const restMenu = document.querySelector(".rest-menu");

const wrongMenu = document.querySelector(".wrong-menu");

const endMenu = document.querySelector(".end-menu");
const scoreDisplay = document.querySelector(".display-score");


launchBtn.addEventListener("click", startNewRound);

let currentBaseDate;
let currentClickDate;

let userTimes = [];

let currentTimeout;


function startNewRound(){

    if(userTimes.length >= 5){

        let score = Math.round(userTimes.reduce((acc, cur) => acc + cur)/5);

        restMenu.style.display = "none";
        endMenu.style.display = "flex";
        scoreDisplay.textContent = `${score} ms`;

    }
    else{

        clearEveryMenu();
        restMenu.removeEventListener("click", startNewRound);
        wrongMenu.removeEventListener("click", startNewRound);
        
        gameMenu.style.display = "flex";
        gameContainer.style.background = "crimson";
        
        gameMenu.addEventListener("click", handleReactClick);
        
        
        let randomDelay = Math.trunc(Math.random()*5000 + 2000); /* Délai entre 2000 et 7000 ms */
        // randomDelaysArray.push(randomDelay);
        
        displayGreenWithDelay(randomDelay);
        
        
        // console.log(clickDate);
        console.log(userTimes);
        
    }
}


function displayGreenWithDelay(randomDelay){

    currentTimeout = setTimeout(()=>{
    
        gameText.textContent = "Cliquez !";
        gameContainer.style.background = "green";
        let baseDate = Date.now();
        currentBaseDate = baseDate

    }, randomDelay)
}


function handleReactClick(){

    let clickDate = Date.now();
    currentClickDate = clickDate;
    reactionTime = currentClickDate - currentBaseDate;

    currentClickDate = 0;


    displayNextMenu(reactionTime);
}


function displayNextMenu(reactionTime){
    if(reactionTime > 0 && gameContainer.style.background ==="green"){
        
        
        userTimes.push(reactionTime);

        gameMenu.style.display = "none";

        gameText.textContent = "Attendez le vert";
        
        restMenu.style.display = "flex";
        restMenu.querySelector(".display-time span").textContent = `${reactionTime}`;
        gameContainer.style.background = "#2b87d1";

        clearTimeout(currentTimeout);

        gameMenu.removeEventListener("click", handleReactClick);
        // startNewRound();

        restMenu.addEventListener("click", startNewRound)

    }else{
        
        
        gameMenu.style.display = "none";

        gameText.textContent = "Attendez le vert";
        
        wrongMenu.style.display = "flex";
        gameContainer.style.background = "#2b87d1";
        
        clearTimeout(currentTimeout);

        gameMenu.removeEventListener("click", handleReactClick);

        wrongMenu.addEventListener("click", startNewRound)

        // startNewRound();
    }
}

function clearEveryMenu(){
    launchMenu.style.display = "none";
    wrongMenu.style.display = "none";
    restMenu.style.display = "none";
    endMenu.style.display = "none";
}

const restartBtn = document.querySelector(".restart-btn");

restartBtn.addEventListener("click", restartGame);

function restartGame(){
    userTimes = [];
    startNewRound();
}