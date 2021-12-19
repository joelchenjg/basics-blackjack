// var main = function (input) {
//   var myOutputValue = 'hello world';
//   return myOutputValue;
// };

// Initial state
document.querySelector("#deal-button").disabled = true;
document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#reveal-button").disabled = true;

// Global variables
var playerCards = [];
var computerCards = [];
var gameMode = "number of players";

// returns a complete cardDeck; name, suit, rank (1-13)
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var rankCountervalue = rankCounter;

      // if rank is 11, 12, or 13, set card rank to 10
      if (cardName == 11 || cardName == 12 || cardName == 13) {
        rankCountervalue = 10;
      }
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCountervalue,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array; returns cardDeck
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(makeDeck());

// regular deck of card objects
var cardDeck = makeDeck();

// GAME MODES PRESENT

var main = function (input) {
  // Initialise index to 0 to start from the beginning of the array
  var index = 0;
  // Define loop condition to loop until index is the length of cardDeck
  while (index < cardDeck.length) {
    // Access attributes of each card with dot notation.
    console.log(cardDeck[index].name);
    console.log(cardDeck[index].rank);
    // Construct a string using attributes of each card object
    var cardTitle = cardDeck[index].name + " of " + cardDeck[index].suit;
    // Log the string
    console.log(cardTitle);
    // Increment the card index
    index = index + 1;
  }
  // // Draw 2 cards from the top of the deck
  // var computerCard = shuffledDeck.pop();
  // var playerCard = shuffledDeck.pop();

  // // Construct an output string to communicate which cards were drawn
  // var myOutputValue =
  //   "Computer had " +
  //   computerCard.name +
  //   " of " +
  //   computerCard.suit +
  //   ". Player had " +
  //   playerCard.name +
  //   " of " +
  //   playerCard.suit +
  //   ". ";

  // // Compare computer and player cards by rank attribute
  // // If computer card rank is greater than player card rank, computer wins
  // if (computerCard.rank > playerCard.rank) {
  //   // Add conditional-dependent text to the output string
  //   myOutputValue = myOutputValue + "Computer wins.";
  //   // Else if computer card rank is less than player card rank, player wins
  // } else if (computerCard.rank < playerCard.rank) {
  //   myOutputValue = myOutputValue + "Player wins!";
  //   // Otherwise (i.e. ranks are equal), it's a tie
  // } else {
  //   myOutputValue = myOutputValue + "It's a tie.";
  // }

  // // Return the fully-constructed output string
  // return myOutputValue;
};
