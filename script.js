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
let matches = 0;
let pointInterval; //increases how many points earned depending on difficulty
let pointDisplay = document.getElementById("pointCounter");

let firstCard;
let firstCardSrc;
let timerDisplay = document.getElementById("countdownTimer");
let timeLeft;
let highScoreDisplay = document.getElementById("highScoreDisplay");
let showScoreEnd = document.getElementById("endScoreShow")

let openingScreen = document.getElementById("openingScreen");
let gameScreen = document.getElementById("gameScreen")
let endScreen = document.getElementById("endScreen")

let cardNameCorrelation = [] 
let takenCards = [] //cards that already racked up points, can't click them again
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

//Add some event listeners for buttons
document.getElementById("goBackButton").addEventListener('click', goHome)
document.getElementById("goHomeEnd").addEventListener('click', goHome)
document.getElementById("instantFinish").addEventListener('click', finishThisStupidGame);

console.log(localStorage.getItem("usersHighestScore"))

 //if user has played before, show their highest score
if (localStorage.getItem("usersHighestScore") != null) {
    highScoreDisplay.innerHTML = "High Score: " + localStorage.getItem("usersHighestScore");
}

function removeScore() { //for testing purposes, clear out your score and reload
    localStorage.clear();
    window.location.reload();
}

function goHome() {
    console.log("cllick")
    window.location.reload();
    endScreen.style.display = "flex";
    openingScreen.style.display = "flex"
    gameScreen.style.display = "none"
    endScreen.style.display = "none"
    highScoreDisplay.innerHTML = "High Score: " + localStorage.getItem("usersHighestScore");
}

function finishThisStupidGame() { //Instant finish for the sake of testing
    gameScreen.style.display = "none";
    endScreen.style.display = "flex";
    let highScore = localStorage.getItem("usersHighestScore");
    let i = 0;
    if (points != 0) {
        const countUpDisplay = setInterval(() => {
        i++;
        showScoreEnd.innerHTML = i;
        if (highScore == null || i == highScore) {
            document.getElementById("newHighScore").innerHTML = "New High Score!"
        }
        if (i == points) {
            clearInterval(countUpDisplay) //Make little ding ding sound?
        }

        }, 50);
    } else {
         showScoreEnd.innerHTML = 0;
    }
    
    if (localStorage.getItem("usersHighestScore") == null || highScore < points) {
        localStorage.setItem("usersHighestScore", points)
    }
}

function loadGame() {
//Variables and everything are set up here. User doesn't see anything until everything here is finished loading.
//  Promise function waits until images are loaded to actually show and start the game, which happens in a seperate function, startGame()

    //oofykins, everything gets messed up because everything was already created at the start of loading. Can either just reload page, or change the setup here
    //restart the game!
     isSecondClick = false;
     disableClick = true;
     points = 0;
     matches = 0;

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

    //document.getElementById("loadScreen").style.display = "block"
   
    function checkLoading(container) {
        const gameContainer = document.getElementById("outerDiv");
        if (!gameContainer) {
            return Promise.reject('Container element not found');
        }

        const images = Array.from(gameContainer.querySelectorAll('img'));
    
        if (images.length === 0) {
            return Promise.resolve(); 
        }


    const promises = images.map((img) => {
        return new Promise((resolve) => {
        // 1. Check if the image is already loaded/cached
        if (img.complete && img.naturalHeight !== 0) {
            resolve();
        } else {
            // 2. Otherwise, listen for load or error events
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true }); 
        }
        });
    });

    return Promise.all(promises);
    }   

// How to use it:
checkLoading('divBoard').then(() => {
    startGame();
  console.log('All images within the div have fully loaded!');
  // Trigger your layout, animations, or calculations here
});

//console.log(cardNameCorrelation)
//Flip to backs after exactly 2 seconds

}

function startGame() {
        
    document.getElementById("loadScreen").style.display = "none"
    openingScreen.style.display = "none"
    timerDisplay.innerHTML = timeLeft;
    gameScreen.style.display = "block"
    pointDisplay.innerHTML = "Points: " + points

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
            setTimeout(() => {
                document.getElementById("fullscoreScreen").style.display = "none"
                document.getElementById("timeoutScreen").style.display = "block"
                finishThisStupidGame();
             }, 20)
            
        }

        if (matches == 9) {
            clearInterval(clockCountdown)
            setTimeout(() => {
                document.getElementById("fullscoreScreen").style.display = "block"
                document.getElementById("timeoutScreen").style.display = "none"
                finishThisStupidGame();
            }, 20)
            
        }

        //if all matches, show fullscorescreen and hide timeout, and finishthisstupdi game

        }, 1000);
    

let cardButton = document.querySelector('.gameGrid');

//Card button click



cardButton.addEventListener('click', e => {
    let cardName = e.target.id;
    console.log(cardName)
    cardName = cardName.replace("div", "") //Doesn't matter if div or image is chosen; referred to by image now
    //Don't do anything if the click is disabled or already flipped
    //create a div reference to add the flip class to. 
    let divRefForFlip = "div" + cardName;

    if (disableClick
        || document.getElementById(cardName).getAttribute("src") != "Card_Images/bro.png"
    ) { //Don't flip if it's disabled (such as the start of game) OR it's already turned over
        console.log("disabled");
        return;
    } 
    
    console.log(e.target.id)
    let cardSrc = document.getElementById(cardName);
    divRefForFlip = document.getElementById(divRefForFlip);
    


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
    turnOnFlip(divRefForFlip, cardSrc, imageName)
    


   // divRefForFlip.classList.remove("card-flip")

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
        checkMatch(firstCard, imageName, firstCardSrc, cardSrc, firstCardName, cardName);
        //this is the second match. time to calculate things!
        isSecondClick = false;

    } else {
        firstCard = imageName;
        firstCardName = cardName;
        firstCardSrc = cardSrc;
        isSecondClick = true;
    }




    /*if (imageName.at()) {
    
    }*/

})


function checkMatch(firstCard, secondCard, firstCardSrc, secondCardSrc, firstCardName, cardName) {
    console.log(firstCard)
    console.log(secondCard)
    firstCard = firstCard.replace(".png", "")
    secondCard = secondCard.replace(".png", "")
    let divRefForFlip1 = "div" + firstCardName;
    divRefForFlip1 = document.getElementById(divRefForFlip1)
    let divRefForFlip2 = "div" + cardName;
    divRefForFlip2 = document.getElementById(divRefForFlip2)
    console.log(firstCard.at(firstCard.length - 1))
    console.log(secondCard.at(secondCard.length - 1))
    if (firstCard.at(firstCard.length - 1) 
        == secondCard.at(secondCard.length - 1)) { //if the last numbers match, it's a match! yipee!
        points += pointInterval
        matches++
        takenCards.push();
        pointDisplay.innerHTML = "Points: " + points
        //make this update automaticallY? idk
    } else {
        disableClick = true;
        setTimeout(() => {
            turnOnFlip(divRefForFlip1, firstCardSrc, "Card_Images/bro.png")
            turnOnFlip(divRefForFlip2, secondCardSrc, "Card_Images/bro.png")
            disableClick = false;

        }, 2000);
        
    }
}
}

//AFTER STARTING GAME//
openingScreen.addEventListener('click', e => {
    if (e.target.id == "easyButton") {
        pointInterval = 10;
        timeLeft = 120;
    } else if (e.target.id == "mediumButton") {
        pointInterval = 15;
        timeLeft = 90;
    } else if (e.target.id == "hardButton") {
        pointInterval = 20;
        timeLeft = 30;
    } else {
        return
    }
    

    loadGame();



})


/**Out of start game */
function quickMatch(){ 
    matches = 9;
}

function turnOnFlip(cardToFlip, card, name) {
    cardToFlip.classList.add("card-flip")

    setTimeout(() => {
        card.src = name 
     }, 150);

    setTimeout(() => {
        cardToFlip.classList.remove("card-flip")

    }, 1000);
}




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