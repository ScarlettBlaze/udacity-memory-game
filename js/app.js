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

/*
 * Create a list that holds all of your cards
 */
const deckOfCards = ["fa fa-diamond", "fa fa-diamon", 
                     "fa fa-paper-plane-o", "fa fa-paper-plane-o", 
                     "fa fa-anchor", "fa fa-anchor", 
                     "fa fa-bolt", "fa fa-bolt", 
                     "fa fa-cube", "fa fa-cube", 
                     "fa fa-leaf", "fa fa-leaf", 
                     "fa fa-bicycle", "fa fa-bicycle", 
                     "fa fa-bomb", "fa fa-bomb"];
                     
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Global Values.
const cardContainer = document.querySelector(".deck");
let openCards = [];
let matchedCards = [];
<<<<<<< HEAD
||||||| merged common ancestors
let time = 0;
let clockId;
let clockOff = true;
=======
let seconds = -1;
let minutes = 0;
let $seconds = $('.seconds');
let $minutes = $('.minutes');
let timer;
>>>>>>> 30ab21b8cec02fb65c6f56179f3f02295cef3440

////////////////////////////////////////////////////////////////////////////
/*
* Starting the game.
*/
///////////////////////////////////////////////////////////////////////////

/*
* Create the deck.
*/
function init(){

  // Shuffle deck.
  let shuffledDeck = shuffle(deckOfCards);

  for(let i = 0; i < deckOfCards.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class = "${shuffledDeck[i]}"</i>`;
    cardContainer.appendChild(card);

    // Call card function.
    click(card);
  }
  // Start the timer.
  counter();
}
/*
* Timer
*/
const counter = function() {
  if(seconds >= 59) {
    seconds = 0;
    minutes++;
  }
  else
  {
    seconds++;
  }
  if(seconds < 10) {
    $seconds.html('0'+ seconds);
  }
  else {
    $seconds.html(seconds);
  }
  if(minutes < 10){
    $minutes.html('0' + minutes);
  }
  else{
    $minutes.html(minutes);
  }
  timer = setTimeout(function() {
    counter();
  }, 1000);
};
/*
* Click Event
*/
function click(card) {

  // Card Click event
  card.addEventListener("click", function() {
<<<<<<< HEAD

    console.log(card.innerHTML);        // Alert console when card is clicked.

||||||| merged common ancestors

    console.log(card.innerHTML);        // Alert console when card is clicked.

    const clickTarget = event.target;
    if(isClickValid(clickTarget)) {
      if (clockOff) {
        startClock();
        clockOff = false;
      }
    }

=======
    
>>>>>>> 30ab21b8cec02fb65c6f56179f3f02295cef3440
    const currentCard = this;
    const previousCard = openCards[0];
    // If opened card exists
    if(openCards.length === 1) {

      card.classList.add("open", "show", "disable"); // Show card.
      openCards.push(this);

      // Compare the two cards.
      compare(currentCard, previousCard);
    }
    // If there are no opened cards
    else {
      card.classList.add("open", "show", "disable"); // Show card.
      openCards.push(this);
    }
  });
}
/*
* Compare Cards.
*/
function compare(currentCard, previousCard) {
  if(currentCard.innerHTML === previousCard.innerHTML) {

    // Cards are the same.
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    // Update matchedCards array.
    matchedCards.push(currentCard, previousCard);

    // Reset current pick and previous pick.
    openCards = [];

    // Is the game over?
    endGame();
  }
  // Cards are not the same.
  else {

    // Wait to show card.
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
    }, 500);

      // Reset current pick and previous pick.
      openCards = [];
  }
  // Add new move.
  addMove();
}
/*
* Shuffling the deck.
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
* End game.
*/
function endGame() {
  if (matchedCards.length === deckOfCards.length){
    clearTimeout(timer);
    toggleModal();
  }
}
/*
* Add move.
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  // Set rating.
  rating();
}
/*
* Restart button mid-game.
*/
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {

  // Delete all cards on screen.
  cardContainer.innerHTML = "";

  // Reset timer.
  clearTimeout(timer);

  // Call 'init' function to create new cards.
  init();

  // Reset variables.
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  ratingContainer.innerHTML = `<span><i class="fa fa-star"></i></span>
                               <span><i class="fa fa-star"></i></span>
                               <span><i class="fa fa-star"></i></span>`;
  seconds = -1;
  minutes = 0;
});
/*
* Restart button on modal.
*/
const modalRestartButton = document.querySelector(".modal_restart");
modalRestartButton.addEventListener("click", function() {

  // Delete all cards on screen.
  cardContainer.innerHTML = "";

  // Reset timer.
  clearTimeout(timer);

  // Close modal.
  toggleModal();
  
  // Call 'init' function to create new cards.
  init();

  // Reset variables.
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  ratingContainer.innerHTML = `<span><i class="fa fa-star"></i></span>
                               <span><i class="fa fa-star"></i></span>
                               <span><i class="fa fa-star"></i></span>`;
  seconds = -1;
  minutes = 0;
});
/*
* Rating
*/
const ratingContainer = document.querySelector(".stars");
function rating() {
  switch(moves) {
    // If moves exceed 20, two star rating.
    case 20:
      ratingContainer.innerHTML = `<span><i class="fa fa-star"></i></span>
                                   <span><i class="fa fa-star"></i></span>`;
    break;
    // If moves exceed 25, one star rating.
    case 25:
      ratingContainer.innerHTML = `<span><i class="fa fa-star"></i></span>`;
    break;
  }
}
/*
* Toggle stat window.
*/
<<<<<<< HEAD
||||||| merged common ancestors
function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
    console.log(time);
  }, 1000);
}
=======
function toggleModal(){
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
  writeModalStats();
}
/*
* Display final results in modal.
*/
function writeModalStats(){
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.timer').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const ratingStat = document.querySelector('.modal_rating');
  const rating = ratingContainer.innerHTML;
>>>>>>> 30ab21b8cec02fb65c6f56179f3f02295cef3440

<<<<<<< HEAD
/////// First time game start.
init();

||||||| merged common ancestors
function displayTime() {
  const timer = document.querySelector('.timer');
  console.log(timer);
  timer.innerHTML = time;
}
/////// First time game start.
init();

=======
  timeStat.innerHTML = `Time: ${clockTime}`;
  movesStat.innerHTML = `Moves: ${moves}`;
  ratingStat.innerHTML = `Rating: ${rating}`;
}
>>>>>>> 30ab21b8cec02fb65c6f56179f3f02295cef3440
/*
* Cancel button in modal.
*/
document.querySelector('.modal_cancel').addEventListener('click', () => {
  toggleModal();
});

/////// First time game start.
init();