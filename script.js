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
    let clearout = false;

    let soundmute = false;
    let musicmute = false;

    let points = 0;
    let matches = 0;
    let pointInterval; //increases how many points earned depending on difficulty


    let firstCard;
    let firstCardSrc;
    let timeLeft;

    /*ONSCREEN DISPLAYS*/
    let timerDisplay = document.getElementById("countdownTimer");
    let highScoreDisplay = document.getElementById("highScoreDisplay");
    let showScoreEnd = document.getElementById("endScoreShow")
    let pointDisplay = document.getElementById("pointCounter");

    /*SCREENS*/
    let openingScreen = document.getElementById("openingScreen");
    let gameScreen = document.getElementById("gameScreen")
    let endScreen = document.getElementById("endScreen")

    /*AUDIO*/
    let clickingSound = document.getElementById("clickSound");
    let flipSound = document.getElementById("cardFlip");
    //const dingSound = new Audio("Audio/pointsclimbing.mp3");
    let dingSoundNode = document.querySelector("#pointsSFX")
   //dingSound.preload = "auto"
    const celebration = new Audio("Audio/celebrationHorn.mp3")
    //let celebration = document.getElementById("celebration");
    flipSound.volume = "0.5"
    const backgroundMusic = document.getElementById("bgmusic");
    const isPlaying = !backgroundMusic.ended && backgroundMusic.currentTime > 0;
    let autoplayOn = true;

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
    document.getElementById("goHomeEnd").addEventListener('click', goHome)
    document.getElementById("goBackButton").addEventListener('click', quit)
    //The three below are old testers. Keep them for the future

    //document.getElementById("instantFinish").addEventListener('click', finishThisStupidGame);
    //document.getElementById("instantFinish").addEventListener('click', clearingout);
    document.getElementById("donationButton").addEventListener('click', e => {
        clickingSound.play();
        window.open("https://ko-fi.com/cdscoffeecake", "_black")
    })
    window.addEventListener('load', function() {

        async function checkAutoplay() {
        try {
            await backgroundMusic.play();
            backgroundMusic.volume = .5;
        } catch (error) {
            backgroundMusic.muted = true;
            musicmute = true;
            musicButton.src = "musicmute.png"
        }
        }
        
        checkAutoplay();

    })

    window.addEventListener("load", init)


    let dingSound2 = new Audio();
    dingSound2.src = "Audio/pointsclimbing.mp3";
    dingSound2.controls = true;

    var context = new AudioContext();
    var analyser = context.createAnalyser();

    window.addEventListener('load', function(e) {
    // Our <audio> element will be the audio source.
    var source = context.createMediaElementSource(dingSoundNode);
    source.connect(analyser);
    analyser.connect(context.destination);
    loadDingSound("Audio/pointsclimbing.mp3");

    }, false);

     
        function init() {
            try {
             window.AudioContext = window.AudioContext || window.webkitAudioContext;
            var context=new AudioContext();
            }
            catch(e) {
                 alert('Web Audio API is not supported in this browser');
            }
        }

        var dingingSoundBuffer = null;

        

        function loadDingSound(url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';

            // Decode asynchronously
            request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) {
             dingingSoundBuffer = buffer;
            }, onError);
            }
            request.send();
        }

        function onError() {
            console.log("oofykins")
        }

        function playSound(buffer) {
            var source = context.createBufferSource(); // creates a sound source
            source.buffer = buffer;                    // tell the source which sound to play
            source.connect(context.destination);       // connect the source to the context's destination (the speakers)
            source.start(0);                          // play the source now
        }

        

//end of sound figuring

    let musicButton = document.getElementById("musicButton");

    function clearingout() {
        clearout = true;
    }

    musicButton.addEventListener("click", e => {
        backgroundMusic.muted = !backgroundMusic.muted;
        console.log(!backgroundMusic.muted)
        if (musicmute == false) {
            musicButton.src = "musicmute.png"
            musicmute = true;
        } else {
            backgroundMusic.volume = .5;
            musicButton.src = "music.png"
            musicmute = false;
            backgroundMusic.play();
        }
  
    })

    soundButton.addEventListener("click", e => {
        if (soundmute == false) {
            soundButton.src = "soundmute.png"
            soundmute = true;
        } else {
            soundButton.src = "sound.png"
            soundmute = false;
        }
            clickingSound.muted = !clickingSound.muted;
            flipSound.muted = !flipSound.muted;
            //dingSound.muted = !dingSound.muted; //still makes noises because of clones!
            celebration.muted = !celebration.muted;
    })

    console.log(localStorage.getItem("usersssHighestScore"))

function origGame() {

    //Set variables to their original values
     isSecondClick = false;
     disableClick = true;
     points = 0;
     matches = 0;
     clearout = false;

     //Remove repeat event listeners



    //Remove arrays and sets
    cardNameCorrelation = [] 
    takenCards = [] //cards that already racked up points, can't click them again
    randSet.clear();
    console.log(matches)

} //


 //if user has played before, show their highest score
if (localStorage.getItem("usersHighestScore") != null) {
    highScoreDisplay.innerHTML = "High Score: " + localStorage.getItem("usersHighestScore");
}

function removeScore() { //for testing purposes, clear out your score and reload. Ended up keeping
    if (confirm("Are you sure you want to reset your high score?")) {
        localStorage.clear();
        window.location.reload();
    }
    
}

function goHome() {
        clickingSound.play()
        //window.location.reload(); Stopped doing this to save song placement and settings
    checkLoading('openingScreen').then(() => { 
         console.log("cllick")
        endScreen.style.display = "none";
        openingScreen.style.display = "flex"
        gameScreen.style.display = "none"
        endScreen.style.display = "none"
        highScoreDisplay.innerHTML = "High Score: " + localStorage.getItem("usersHighestScore");
        });
   
}

function quit() {
    clearingout();
    if (confirm("Are you sure you want to quit?")) {
            goHome();
        }
}

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

function finishThisStupidGame() { //Instant finish for the sake of testing
    gameScreen.style.display = "none";
    endScreen.style.display = "flex";
    
    let highScore = localStorage.getItem("usersHighestScore");
    if (highScore == null) {
        highScore = 0;
    }
    let i = -1;
    if (points != 0) { 
        console.log("points is running")
       /*
        function animate() {
            i++;
            showScoreEnd.textContent = i;

            if (!soundmute) {
                playSound(dingingSoundBuffer)
            }
            
            //WOAH IT WORKED!!!
            if (i == highScore) {
                document.getElementById("newHighScore").textContent = "New High Score!" 
                celebration.play()
            }
             if (i == 100) {
                    //repDing.remove();
                return;
                //clearInterval(countUpDisplay) //Make little ding ding sound?
            } else {
                //repDing.remove();
                 requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate);

*/
        
       //do I do animation or frames? Frames is smooth, but too fast I think
       
        const start = performance.now();
        scoreClimb()
        function scoreClimb() {

            i++;
            showScoreEnd.textContent = i;
            if (!soundmute) {
                playSound(dingingSoundBuffer)
            }
            
            if (i == highScore) {
                document.getElementById("newHighScore").textContent = "New High Score!" 
                celebration.play()
            }
             if (i == points) {
                    const end = performance.now();
                    console.log(`Time: ${end - start} ms`);
            } else {
                setTimeout(scoreClimb, 50);
            }
        }

        


        
    } else {
         showScoreEnd.textContent = 0;
    }
    
    if (highScore < points) {
        localStorage.setItem("usersHighestScore", points)
    }
}

function loadGame() {
    //Variables and everything are set up here. User doesn't see anything until everything here is finished loading.
    //  Promise function waits until images are loaded to actually show and start the game, which happens in a seperate function, startGame()

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
    console.log("randomTime!")
    randSet.add(randNumber)
}

let randArray = [...randSet]

console.log(randArray)

for (let i = 1; i < 19; i++) {
    let nameOfImage = arrayOfNames[randArray[i -1]];
    document.getElementById("card" + i).src = nameOfImage;
    cardNameCorrelation[i -1] = nameOfImage;
}

   


checkLoading('divBoard').then(() => {
    startGame();
});

//Flip to backs after exactly 2 seconds

}

function startGame() {

    openingScreen.style.display = "none"
    timerDisplay.innerHTML = timeLeft;
    gameScreen.style.display = "block"
    pointDisplay.innerHTML = "Points: " + points


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
                //document.getElementById("timeoutScreen").style.display = "block"
                cardButton.removeEventListener('click', buttonCheck)
                finishThisStupidGame();
             }, 20)
            
        }

        if (matches == 9) {
            clearInterval(clockCountdown)
            setTimeout(() => {
                document.getElementById("fullscoreScreen").style.display = "block"
                endScreen.style.backgroundImage = "url('fullScorebackground.png')"
                //document.getElementById("timeoutScreen").style.display = "none"
                cardButton.removeEventListener('click', buttonCheck)
                finishThisStupidGame();
            }, 20)
            
        }
        if (clearout == true) {
            cardButton.removeEventListener('click', buttonCheck)
            clearInterval(clockCountdown);
        }

        //if all matches, show fullscorescreen and hide timeout, and finishthisstupdi game

        }, 1000);
    

let cardButton = document.querySelector('.gameGrid');

//Card button click

function buttonCheck(e) {
    console.log("FUNCTION CALL!!!")    
    console.log("Is this the second click?" + isSecondClick)
    console.log("is clicking disabled? "+ disableClick)
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
    
    //flipSound.play();

    
    let indexForImage = cardName.replace("card", "")
    indexForImage = indexForImage - 1;
    
    let imageName = cardNameCorrelation[indexForImage] 
    //Note: e.target.id will be card + number. Get the image that correlates to the card's index in the cardNameCorrelationArray
    //check which side card is
    
    //if cardName is div and not img, then you need to change to get query selector 
    
    let testDiv = e.target.id;

    checkLoading('divBoard').then(() => { //this promise (should) prevent the card from flipping with no animation
        turnOnFlip(divRefForFlip, cardSrc, imageName)
    });
    


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
}


cardButton.addEventListener('click', buttonCheck)


function checkMatch(firstCard, secondCard, firstCardSrc, secondCardSrc, firstCardName, cardName) {

    firstCard = firstCard.replace(".png", "")
    secondCard = secondCard.replace(".png", "")
    let divRefForFlip1 = "div" + firstCardName;
    divRefForFlip1 = document.getElementById(divRefForFlip1)
    let divRefForFlip2 = "div" + cardName;
    divRefForFlip2 = document.getElementById(divRefForFlip2)

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
    origGame()
    clickingSound.play();
    loadGame();
    console.log("matches = " + matches)
})


/**Out of start game */
function quickMatch(){ 
    matches = 9;
}

function turnOnFlip(cardToFlip, card, name) {
    flipSound.play()
    cardToFlip.classList.add("card-flip")

    setTimeout(() => {
        card.src = name 
     }, 150);

    setTimeout(() => {
        cardToFlip.classList.remove("card-flip")

    }, 1000);
}
