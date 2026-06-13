//Create variables using a format like this:
        //let canvasId = document.getElementById("canvas" + layerId);

/*


image src names can be card1, card2, etc, and you can incrememnt the names
through a loop!
for i < 18, i++
get element id for card i, update to image. 
for randomization, card i should equal a src value where instead of src 
being i, src increments through array of randomized, non-repeating values. 
This allows random images to be chosen based on a random number assortment. 



*/
let isSecondClick = false;
let disableClick = true;
let points = 0;
let pointDisplay = document.getElementById("pointCounter");
let firstCard;
let firstCardSrc;
let timerDisplay = document.getElementById("countdownTimer");
let timeLeft;

let openingScreen = document.getElementById("openingScreen");
let gameScreen = document.getElementById("gameScreen")

let playButtons = document.querySelector(".playButtons");

openingScreen.addEventListener('click', e => {
    if (e.target.id == "easyButton") {
        timeLeft = 120;
    } else if (e.target.id == "mediumButton") {
        timeLeft = 90;
    } else if (e.target.id == "hardButton") {
        timeLeft = 60;
    }

    console.log(e.target.id)
    openingScreen.style.display = "none"
    timerDisplay.innerHTML = timeLeft;
    gameScreen.style.display = "block"
    pointDisplay.innerHTML = "Points: " + points




let randSet = new Set();
let arrayOfNames = [
    "Card_Images/memImage1-1.png", 
    "Card_Images/memImage2-1.png",
    "Card_Images/memImage3-2.png", 
    "Card_Images/memImage4-2.png",
    "Card_Images/memImage5-3.png", 
    "Card_Images/memImage6-3.png",
    "Card_Images/memImage7-4.png", 
    "Card_Images/memImage8-4.png",
    "Card_Images/memImage9-5.png", 
    "Card_Images/memImage10-5.png",
    "Card_Images/memImage11-6.png", 
    "Card_Images/memImage12-6.png",
    "Card_Images/memImage13-7.png", 
    "Card_Images/memImage14-7.png",
    "Card_Images/memImage15-8.png", 
    "Card_Images/memImage16-8.png",
    "Card_Images/memImage17-9.png",
    "Card_Images/memImage18-9.png"
]; 




/*
//array that holds the image source names in the order of 
//the card names. For instance, if card 10 has image 5, then index 10 has string "memImage5"

//now, how do we find out if cards match?
/*
scratch the above: fill an array with names of the stupid mem image names. 
so it doesn't matter what the actual name of the image is. Then, have 
an array of randomly generated, non-repeated values. The value will correlate
to the index of the arrayOfNames. 

Since we can now name are images anything, we will add a duplicate 
value to the end of the name. for instance:
memImage11
memImage21
you can slice off the end of the string name 
*/
let cardNameCorrelation = [] 
let takenCards = [] //cards that already racked up points, can't click them again
let index = 0;
while (randSet.size < 18) {
    let randNumber = Math.floor(Math.random() * 18)
    randSet.add(randNumber)
}

let randArray = [...randSet]

console.log(randArray)

for (let i = 1; i < 19; i++) {
    let nameOfImage = arrayOfNames[randArray[i -1]];
    document.getElementById("card" + i).src = nameOfImage;
    cardNameCorrelation[i -1] = nameOfImage;
}

//console.log(cardNameCorrelation)
//Flip to backs after exactly 2 seconds

//UNCOMMENT THIS!!!!! Commented now to save time, but is crucial during gameplay!
setTimeout(() => {
  for (let i = 1; i < 19; i++) {
    document.getElementById("card" + i).src = "Card_Images/bro.png";
    disableClick = false;
}
}, 2000);

const clockCountdown = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = timeLeft;
        if (timeLeft == 0) {
            clearInterval(clockCountdown)
        }
        }, 1000);
    

let cardButton = document.querySelector('.gameGrid');

//Card button click



cardButton.addEventListener('click', e => {
    let cardName = e.target.id;
    console.log(cardName)
    cardName = cardName.replace("div", "") //Doesn't matter if div or image is chosen; referred to by image now
    //Don't do anything if the click is disabled or already flipped

    if (disableClick
        || document.getElementById(cardName).getAttribute("src") != "Card_Images/bro.png"
    ) { //Don't flip if it's disabled (such as the start of game) OR it's already turned over
        console.log("disabled");
        return;
    } 
    
    console.log(e.target.id)
    let cardSrc = document.getElementById(cardName);
    


    console.log("START")
    console.log(cardName)
    console.log(cardNameCorrelation)
    
    let indexForImage = cardName.replace("card", "")
    indexForImage = indexForImage - 1;
    console.log(indexForImage)
    
    let imageName = cardNameCorrelation[indexForImage] 
    //Note: e.target.id will be card + number. Get the image that correlates to the card's index in the cardNameCorrelationArray
    //check which side card is
    
    //if cardName is div and not img, then you need to change to get query selector 
    
    console.log(cardSrc)
    let testDiv = e.target.id;
    /*
    if (testDiv.slice(0, 3) == "div") { //not detecting it as a div
        cardSrc = cardSrc.querySelector("img");
        console.log("oofykins")
    }*/
    console.log(cardSrc)
    cardSrc.src = imageName
    /*flips either way, probably no need
    if (cardSrc.getAttribute("src") == imageName) {
        cardSrc.src = "Card_Images/bro.png"
    } else {
        
    cardSrc.src = imageName
    }
*/
    console.log(cardSrc.getAttribute("src"))



        //Checks if this is the match card. 

    if (isSecondClick) {
        checkMatch(firstCard, imageName, firstCardSrc, cardSrc);
        //this is the second match. time to calculate things!
        isSecondClick = false;

    } else {
        firstCard = imageName;
        firstCardSrc = cardSrc;
        isSecondClick = true;
    }




    /*if (imageName.at()) {
    
    }*/

})



function checkMatch(firstCard, secondCard, firstCardSrc, secondCardSrc) {
    console.log(firstCard)
    console.log(secondCard)
    firstCard = firstCard.replace(".png", "")
    secondCard = secondCard.replace(".png", "")
    if (firstCard.at(firstCard.length - 1) 
        == secondCard.at(secondCard.length - 1)) { //if the last numbers match, it's a match! yipee!
        points++;
        takenCards.push();
        pointDisplay.innerHTML = "Points: " + points
        //make this update automaticallY? idk
    } else {
        disableClick = true;
        setTimeout(() => {
            firstCardSrc.src = "Card_Images/bro.png";
            secondCardSrc.src = "Card_Images/bro.png";
            disableClick = false;
        }, 2000);
        
    }
}

})






//when a card is clicked. 
/*
do event listener?
// 2. Define the event handler function




// 3. Attach the event listener
actionButton.addEventListener('click', handleButtonClick);


flip function?
function flipImage(card) {
    let cardName = card;

    Note: e.target.id will be card + number. Get the image that correlates to the card's index in the cardNameCorrelationArray
    document.getElementById(cardName).src = cardNameCorrelation[cardName.at(4)]
}

function flipBack(card) {
    let cardName = card;

    Note: e.target.id will be card + number. Get the image that correlates to the card's index in the cardNameCorrelationArray
    document.getElementById(cardName).src = whatever the generic back image is.
}


*/