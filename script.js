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

console.log(cardNameCorrelation)
//Flip to backs after exactly 2 seconds

//UNCOMMENT THIS!!!!! Commented now to save time, but is crucial during gameplay!
setTimeout(() => {
  for (let i = 1; i < 19; i++) {
    document.getElementById("card" + i).src = "Card_Images/bro.png";
}
}, 2000);


let cardButton = document.querySelector('.gameGrid');
cardButton.addEventListener('click', e => {
    let cardName = e.target.id;
    let cardSrc = document.getElementById(cardName);
    cardName = cardName.replace("div", "") //Doesn't matter if div or image is chosen; referred to by image now
    
    console.log("START")
    console.log(cardName)
    console.log(cardNameCorrelation)
    
    let indexForImage = cardName.replace("card", "")
    indexForImage = indexForImage - 1;
    console.log(indexForImage)
    
    let imageName = cardNameCorrelation[indexForImage] 
    console.log(imageName)
    //Note: e.target.id will be card + number. Get the image that correlates to the card's index in the cardNameCorrelationArray
    //check which side card is
    console.log(cardName)
    
    //if cardName is div and not img, then you need to change to get query selector 
    
    if (e.target.id.localName == "div") { //not detecting it as a div
        cardSrc = cardName.querySelector("img");
    }
    console.log(cardSrc)

    if (cardSrc.getAttribute("src") == imageName) {
        cardSrc.src = "Card_Images/bro.png"
    } else {
        cardSrc.src = imageName
    }

    //Checks if this is the match card. 
    if (isSecondClick) {
        //this is the second match. time to calculate things!
        isSecondClick = false;
    } else {
        isSecondClick = true;
    }


    /*if (imageName.at()) {
    
    }*/

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