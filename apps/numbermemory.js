
const launchMenu = document.querySelector(".launch-menu");
const launchBtn = document.querySelector(".launch-btn");

const rememberMenu = document.querySelector(".game-number-display");
const numberMenu = document.querySelector(".number-input-menu");
const restMenu = document.querySelector(".rest-menu");
const endMenu = document.querySelector(".end-menu");

const menuList = [launchMenu, rememberMenu, numberMenu, restMenu, endMenu];




let level = 0;
let timerDuration = 1000;
let currentNumber;


launchBtn.addEventListener("click", startNewRound);

function startNewRound(){
    level++;
    timerDuration += 1000;
    
    clearMenu();
    
    displayMenu(rememberMenu);
    
    displayRandomNumber(level);
    displayProgressAnimation(timerDuration, level);
    
}


const form = document.querySelector(".number-input-menu form");
// console.log(form);

form.addEventListener("submit", verifyAnswer);

function verifyAnswer(e){
    e.preventDefault();
    let userAnswer = document.querySelector(".number-input-menu .number-input");
    // console.log(userAnswer);
    if(userAnswer.value == currentNumber && userAnswer.value.length > 0){
        clearMenu();
        displayMenu(restMenu);

        restMenu.children[1].textContent = currentNumber;
        restMenu.children[3].textContent = userAnswer.value;
        restMenu.children[4].textContent = `Niveau ${level}`;
        nextRoundBtn.focus();
        userAnswer.value = "";
        
    }else{
        clearMenu();
        displayMenu(endMenu);
        
        endMenu.children[1].textContent = currentNumber;
        endMenu.children[3].textContent = userAnswer.value;
        endMenu.children[4].textContent = `Niveau ${level}`;
        userAnswer.value = "";
    }
}

const nextRoundBtn = document.querySelector(".next-btn");

nextRoundBtn.addEventListener("click", startNewRound);



// La longueur du nombre est liée au level (level +1)
function displayRandomNumber(numberLength){

    // let randomNumber = Math.trunc(Math.random()*Math.pow(10,numberLength)); //Erreurs occasionnelles où il n'y a pas le bon nombre de chiffres. (quand le nombre commence par 0.0... surement)
    let randomNumber = getRandomNumber(numberLength); // Fonction spécifique utilisant double Math.random(), pas d'erreur de longueur visiblement.
    currentNumber = randomNumber;
    console.log(randomNumber);
    rememberMenu.querySelector(".number-display").textContent = `${randomNumber}`;
}

function displayProgressAnimation(timerDuration, level){

    // const progressBar = rememberMenu.querySelector(".progress-bar");
    const fillLine = rememberMenu.querySelector(".fill-line");
    fillLine.style.animation = `timer ${(timerDuration/1000)}s linear`;
    
    // setTimeout(()=>{ //Pour que la classe "active" soit ajoutée après avoir changer le style de la fillLine
    //     progressBar.classList.add("active");
    // },1)
    
    setTimeout(() =>{
        
        // progressBar.classList.remove("active");
        clearMenu();
        displayMenu(numberMenu);
        document.querySelector(".number-input-menu .number-input").focus();

    },timerDuration + 10)

}

function clearMenu(){
    menuList.forEach(element => {
        element.style.display = "none";
    })
}

function displayMenu(menuName){
    menuName.style.display = "flex";
}

endMenu.querySelector(".restart-btn").addEventListener("click", resetGame);

function resetGame(){
    level = 0;
    timerDuration = 1000;
    currentNumber = 0;

    startNewRound();
}

function getRandomNumber(numberLength){
    let randomNumberArray = [];
    for (let index = 0; index < numberLength; index++) {
        let randomIndex = Math.trunc(Math.random()*10);
        let randomNumberInter = (Math.random()*1000000000).toString().split('.',).join('');
        randomNumberArray.push(randomNumberInter[randomIndex]);
    }
    return randomNumberArray.join('');
}