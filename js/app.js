let track = document.getElementById('moves');
let cards = document.querySelectorAll('.card');/*a list that holds all cards*/
let cardsArray = Array.from(cards);
let watch = document.getElementById('watch');
let deck = document.getElementById('cardDeck');
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let modBody = document.querySelector('.modal-body');
let totalClicks = 0;
let matchedCardsList = [];
let firstCard, secondCard, innerFirst, innerSecond;
let flipped = false;
let doneMatching = false;
let starRate = "Three Stars";

//////////////////////////////////////////////////   
function play(){
    shuffel();    
	startTimer();
    cardsArray.forEach(card =>{
    card.addEventListener('click', () => {
    isFlipped(card);
        })
    })
}

//////////////////////////////////////////////////                      
function shuffel(){
    for(let i = cardsArray.length-1 ; i>0 ;i-- ){
        let randIndex = Math.floor(Math.random() *(i+1));
        cardsArray[randIndex].style.order = i;
        cardsArray[i].style.order = randIndex;
    }
}

////////////////////////////////////////////////// 
function startTimer(){
    deck.addEventListener('click', function() {
		start();
    },{ once: true });//starts only the first time the deck is clicked on
}

//////////////////////////////////////////////////       
function isFlipped(card){
    if (doneMatching)return;
     if (card === firstCard)return;
     card.classList.add('open', 'show');
     if(!flipped){
          firstCard = card;
          innerFirst = firstCard.innerHTML;
          console.log(firstCard);
          flipped = true;
          return ;
    }
     // second click
    secondCard = card;
    innerSecond = secondCard.innerHTML;
    console.log(secondCard);
    clickCounter();
    evaluate();
}  

//////////////////////////////////////////////////             
function clickCounter(){
    totalClicks++;
    track.innerText = totalClicks ;
    starRating(totalClicks);
}
//////////////////////////////////////////////////            
function evaluate(){
    if(match(innerFirst,innerSecond)){
        matchedCardsList.push(firstCard);
        matchedCardsList.push(secondCard);
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        doneMatching = false; 
        flipped = false;
        firstCard = null;
        secondCard = null;
       
    }else{
        doneMatching = true;
        setTimeout(function(){  
            firstCard.classList.remove('open','show');
            secondCard.classList.remove('open','show');
            doneMatching = false; 
            flipped = false;
            firstCard = null;
            secondCard = null;}, 500);
    }    
    isGameOver();
}

//////////////////////////////////////////////////            
function match(firstCard,secondCard){
    return (firstCard === secondCard)      
}

//////////////////////////////////////////////////            
function isGameOver(){
    if (matchedCardsList.length === cardsArray.length){
        //stop the watch
        stop();
        //make the modal appear 
        modal.style.display = "block";
        //get the values to be printed out
        modBody.innerText = `Rate:  ${starRate}

                             Moves: ${totalClicks}
                             
                             Time: ${document.getElementById('watch').innerText} `;

        // To close the modal when the player clicks on (x) 
        span.onclick = function() {
        modal.style.display = "none";
       }
        // To close the modal when the player clicks anywhere outside of the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            } 
        }
    }
}

//////////////////////////////////////////////////            
function starRating(clicks){
    switch(clicks){
        case 9 :
        document.getElementById("starThree").classList.add('fa-star-o');
        document.getElementById("starThree").classList.remove('fa-star');
        starRate = "Two Stars";
        break; 
        case 17 :
        document.getElementById("starTwo").classList.add('fa-star-o');
        document.getElementById("starTwo").classList.remove('fa-star');
        starRate = "One Star";
        break; 
        case 25:
        document.getElementById("starOne").classList.add('fa-star-o');
        document.getElementById("starOne").classList.remove('fa-star');
        starRate = "No Stars"
        break; 
    }
}
/////////////////////////////////////////////////
/*This stop watch code is based on this code
 https://codingwithsara.com/stopwatch-with-javascript */
///////////////////////////////////////////////////
let status = 0; // 0:stop 1:running
let time = 0;
    
function start(){
    status = 1;
    timer();
}
function stop(){
    status = 0;   
}

function timer(){
    if (status == 1) {
        setTimeout(function() {
            time++;
            let min = Math.floor(time/100/60);
            let sec = Math.floor(time/100);
            let mSec = time % 100;
            if (min < 10) min = "0" + min;
            if (sec >= 60) sec = sec % 60;
            if (sec < 10) sec = "0" + sec;
            if (mSec < 10) mSec = "0" + mSec;
            watch.innerHTML = min + ":" + sec + ":" + mSec;
            timer();
        }, 10);
    }
}

//////////////////////////////////////////////////            
function resetGame(){ 
    location.reload();
}   
////////////////////////////////////////////////// 

play();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
