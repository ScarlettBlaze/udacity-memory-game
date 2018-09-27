/*
 * Create a list that holds all of your cards
 */
const deckOfCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardContainer = document.querySelector(".deck");
let openCards = [];
let matchedCards = [];

/*
* Starting the game.
*/
// Create cards
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
}
/*
* Click Event
*/
function click(card) {
  // Card Click event
  card.addEventListener("click", function() {

    console.log(card.innerHTML);        // Alert console when card is clicked.

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
    console.log("Matched!");

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
      console.log("No match!");
    }, 500);

      // Reset current pick and previous pick.
      openCards = [];
  }
  // Add new move.
  addMove();
}
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
    alert("Game Over!")
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
* Restart button.
*/
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
  // Delete all cards on screen.
  cardContainer.innerHTML = "";

  // Call 'init' function to create new cards.
  init();

  // Reset variables.
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  ratingContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
});
/*
* Rating
*/
const ratingContainer = document.querySelector(".stars");
function rating() {
  switch(moves){
    case 20:
      ratingContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    break;
    case 25:
      ratingContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    break;
  }
}
/////// First time game start.
init();

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
