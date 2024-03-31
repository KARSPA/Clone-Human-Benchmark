

const cardsList = document.querySelectorAll(".card");

console.log(cardsList);

cardsList.forEach(card => card.addEventListener("mouseenter", changeToOrange));
cardsList.forEach(card => card.addEventListener("mouseleave", changeToBlue));

function changeToOrange(e){

    let imgSrc = e.target.firstElementChild.src;
    let imgSrcLength = imgSrc.length
    let newSrc = imgSrc.slice(0,imgSrcLength-4) + " active.svg";
    e.target.firstElementChild.src = newSrc;
    e.target.firstElementChild.style.opacity = "1"

}

function changeToBlue(e){

    let imgSrc = e.target.firstElementChild.src;
    let imgSrcLength = imgSrc.length
    let newSrc = imgSrc.slice(0,imgSrcLength-13) + ".svg";
    e.target.firstElementChild.src = newSrc;
    e.target.firstElementChild.style.opacity = "0.6"
        
}