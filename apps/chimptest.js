
let lives = 3;

const gameInfo = {
    numberOfCell:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
}

const gameContainer = document.querySelector(".game-container");


const launchBtn = document.querySelector(".start-btn");

launchBtn.addEventListener("click", startChimpGame);


let round = 0;
function startChimpGame(){

    if(lives == 0){
        displayEndMenu();
        return
    }

    clearMenuInterface();
    hideRestMenu();
    createGameGrid();

    const gameGrid = getGameGrid();
    populateGameUI(round, gameGrid);

    getActiveCells(gameGrid);
}


function clearMenuInterface(){
    const launchMenu = document.querySelector(".launch-menu");
    launchMenu.style.display = "none";
    const endMenu = document.querySelector(".end-menu");
    endMenu.style.display = "none";
}

function createGameGrid(){

    let gameDisplay = document.createElement("div");
    gameDisplay.classList.add("game-display");
    gameContainer.appendChild(gameDisplay)
    gameContainer.classList.add("active");

    for(let i = 0; i < 40;i++){
        let cell = document.createElement("div");
        cell.classList.add(`cell`);
        cell.classList.add(`cell-${i}`);
        gameDisplay.appendChild(cell);
    }
}

function getGameGrid(){
    const cells = [...document.querySelectorAll(".cell")];
    return cells
}


let randomIndexArray = [];
function populateGameUI(round, gameGrid){
    while(randomIndexArray.length < gameInfo.numberOfCell[round]){
        let randomIndex = Math.trunc(Math.random()*40);
        if(!randomIndexArray.includes(randomIndex)){
            randomIndexArray.push(randomIndex);
        }else{
            continue;
        }
    }
    
    for(index in randomIndexArray){
        let value = randomIndexArray[index];
        gameGrid[value].textContent = parseInt(index) + 1;
        gameGrid[value].classList.add("active");
    }
    return(randomIndexArray)
}

function getActiveCells(gameGrid){
    gameGrid.forEach(element => {
            if(element.classList.contains("active")){
                element.addEventListener("click",registerAndCheckAnswer);
            }
        
    });
}

let userAnswer = [];

function registerAndCheckAnswer(e){
    
    if(round >= 1 && userAnswer.length >= 0){
        const activeCells = document.querySelectorAll(".cell.active");
        activeCells.forEach(cell => cell.style.backgroundColor = "#f1f1f1");
    }

    let clickedCell = e.target;
    clickedCell.style.opacity = "0";
    userAnswer.push(clickedCell.textContent);

    // Check si le dernier ajouté à la liste de réponse est bien égal à son index +1 (dans l'ordre croissant quoi...)
    if(userAnswer[userAnswer.length - 1] == userAnswer.indexOf(clickedCell.textContent)+1){
    }else{
        lives--;
        userAnswer = [];
        randomIndexArray=[];

        if(lives === 0){
            clearGrid()
            displayEndMenu()
        }else{
            
            displayRestInterface();
        }

    }

    //Vérifie combien de case ont été cliquées et si il y en a autant que le nombres de cases à cliquer c'est que le round est fini !

    if(userAnswer.length == gameInfo.numberOfCell[round]){
        round++;
        userAnswer = [];
        randomIndexArray=[];
        displayRestInterface();
    }
}


function displayRestInterface(){
    clearGrid();
    const restMenu = document.querySelector(".rest-menu");
    populateRestMenu(restMenu);
    restMenu.style.display = "block";

    const continueBtn = document.querySelector(".continue-btn");
    continueBtn.addEventListener("click", startChimpGame);
}

function hideRestMenu(){
    document.querySelector(".rest-menu").style.display = "none";
}

function populateRestMenu(restMenu){
    restMenu.children[1].textContent = gameInfo.numberOfCell[round];
    restMenu.children[3].textContent = `${lives} sur 3`;
}


function clearGrid(){
    const grid = document.querySelector(".game-display");
    grid.remove();
}

function displayEndMenu(){

    const endMenu = document.querySelector(".end-menu");

    endMenu.children[2].textContent = `${gameInfo.numberOfCell[round]}`;
    endMenu.style.display = "flex";

    lives = 3;
    round = 0;
    document.querySelector(".restart-btn").addEventListener("click", startChimpGame);
}