// var main = function (input) {
//   var myOutputValue = 'hello world';
//   return myOutputValue;
// };

// Initial state
document.querySelector("#deal-button").disabled = true;
document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#restart-button").disabled = true;

// Global variables
var playerCards = [];
var computerCards = [];
var gameMode = "number of players";
// var players = [1, 2, 3, 4, 5, 6];
// var playerScore = [0, 0, 0, 0, 0, 0];
// var computerScore = [0, 0, 0, 0, 0, 0];
var numberofplayers = 1;
var currentplayer = 0;

// Players setup
function createplayers() {
  for (let i = 0; i < numberofplayers; i++) {
    playerCards.push([]);
  }
}

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

// ================ GAME MODES PRESENT ================

// pre game start post player input
function preGame() {
  // gameMode = "game to deal";
  document.querySelector("#submit-button").disabled = true;
  document.querySelector("#deal-button").disabled = false;
  document.querySelector("#restart-button").disabled = false;
}

// start of game
function gameDeal() {
  // creates an array within playerCards array for each player
  createplayers();

  var j = 0;
  while (j < 2) {
    for (let i = 0; i < numberofplayers; i++) {
      playerCards[i].push(shuffledDeck.pop());
    }
    computerCards.push(shuffledDeck.pop());
    j += 1;
  }
  // for (let i = 0; i < numberofplayers; i++) {
  //   playerCards[i].push(shuffleCards.pop());
  // }
  // dealerCards.push(shuffleCards.pop());
  // for (let i = 0; i < numberofplayers; i++) {
  //   playerCards[i].push(shuffleCards.pop());
  // }
  // dealerCards.push(shuffleCards.pop());
  // gameMode = "game ongoing";
  document.querySelector("#submit-button").disabled = true;
  document.querySelector("#deal-button").disabled = true;
  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stand-button").disabled = false;
  document.querySelector("#restart-button").disabled = false;
}

// reset game
function gameReset() {
  playerCards = [];
  computerCards = [];
  gameMode = "number of players";
  shuffledDeck = shuffleCards(makeDeck());
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#deal-button").disabled = true;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#restart-button").disabled = true;
}

// if player hit
function playerHit(playerCards) {
  // gameMode = "player hit";
  playerCards.push(shuffledDeck.pop());
}

// if player stand
function playerStand() {
  gameMode = "player stand";
  document.querySelector("#deal-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
}

// if computer hits
function computerHit() {
  computerCards.push(shuffledDeck.pop());
}

// calculate the total value of cards in each hand reuterns total
function ValueofCards(array) {
  var cumulative = array.reduce((a, b) => b.rank + a, 0);
  if (aceinside(array) && cumulative + 10 <= 21) {
    cumulative += 10;
  }
  return cumulative;
}

// calculate for the ace in each hand if applicable #true or false
// used in ValueofCards
function aceinside(array) {
  return array.some((card) => card.name == "ace");
}

// check for twentyone; #true or false
function twentyone(array) {
  return ValueofCards(array) == 21;
}

// main messages

function computermessage() {
  var output = `<br><br><u>Dealer's Hand:</u><br>`;
  for (let i = 0; i < computerCards.length; i++) {
    output += `${computerCards[i].name} of ${computerCards[i].suit}<br>`;
  }
  output += `<br>Sum of this hand is ${ValueofCards(computerCards)}.<br><br>`;
  return output;
}

function message(playerCards) {
  var output = "";
  for (let i = 0; i < playerCards.length; i++) {
    output += `<br><br><u>Player ${i + 1}'s hand:</u><br>`;
    for (let j = 0; j < playerCards[i].length; j++) {
      output += `${playerCards[i][j].name} of ${playerCards[i][j].suit}<br>`;
    }
    output += `<br>Sum of this hand is ${ValueofCards(playerCards[i])}.`;
    if (twentyone(playerCards[i])) {
      output += ` Player ${i + 1} wins with Blackjack!`;
    } else if (ValueofCards(playerCards[i]) > 21) {
      output += ` BUST`;
    }
  }
  return output;
}

var main = function (input) {
  var myOutputValue = "";
  // to restart the game at any time
  if (input == "restart") {
    gameReset();
  }
  // input required for number of players
  if (gameMode == "number of players") {
    if (Number(input) <= 6 && Number(input) >= 1) {
      // assign number of players
      numberofplayers = input;
      // pregame function buttons
      preGame();
      gameMode = "game to deal";
      myOutputValue += `Number of Players chosen in this game: <b>${numberofplayers}</b>`;
      return myOutputValue;
    } else {
      myOutputValue += `Please input a value from 1-6 please`;
      return myOutputValue;
    }
  } else if (gameMode == "game to deal") {
    if (input == "deal") {
      // deck out two cards per player and house
      gameDeal();
      gameMode = "game ongoing";
      myOutputValue += `It is Player ${currentplayer + 1}'s turn`;
      myOutputValue += message(playerCards) + computermessage();
    } else {
      myOutputValue += `Please click on the DEAL button to continue`;
    }
    return myOutputValue;
  } else if (gameMode == "game ongoing") {
    myOutputValue += `It is Player ${currentplayer + 1}'s turn`;
    if (input == "hit") {
      // push new card into player hand
      playerHit(playerCards[currentplayer]);
      if (ValueofCards(playerCards[currentplayer]) > 21) {
        currentplayer += 1;
        myOutputValue =
          currentplayer < numberofplayers
            ? `BUST! It is Player ${currentplayer + 1}'s turn`
            : `BUST! It's the Dealer's turn`;
      } else if (twentyone(playerCards[currentplayer])) {
        currentplayer += 1;
        myOutputValue =
          currentplayer < numberofplayers
            ? `BLACKJACK! It is Player ${currentplayer + 1}'s turn`
            : `BLACKJACK! It's the Dealer's turn`;
      }
    } else if (input == "stand" && currentplayer < numberofplayers) {
      currentplayer += 1;
      myOutputValue =
        currentplayer < numberofplayers
          ? `It is Player ${currentplayer + 1}'s turn`
          : `It's the Dealer's turn`;
    } else {
      myOutputValue = `It's the Dealer's turn`;
      while (ValueofCards(computerCards) < 15) {
        computerHit();
      }
      gameMode = "conclusion";
    }
    myOutputValue += message(playerCards) + computermessage();
  } else if (gameMode == "conclusion") {
  }
  return myOutputValue;

  // // Initialise index to 0 to start from the beginning of the array
  // var index = 0;
  // // Define loop condition to loop until index is the length of cardDeck
  // while (index < cardDeck.length) {
  //   // Access attributes of each card with dot notation.
  //   console.log(cardDeck[index].name);
  //   console.log(cardDeck[index].rank);
  //   // Construct a string using attributes of each card object
  //   var cardTitle = cardDeck[index].name + " of " + cardDeck[index].suit;
  //   // Log the string
  //   console.log(cardTitle);
  //   // Increment the card index
  //   index = index + 1;
  // }
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

// checks if the array contains the element
// const includestwo = items.includes(2)

// cumulatively operation for the elements in an Array
// const total = itesm.reduce((currenttotal, item) => {
//   return item.price + currenttotal
// }, 0)

// checks the array for a cumulative boolean value
// const itemexpensive = items.every((item) => {
//   return item.price <= 100
// })

// checks the array for a boolean value
// const itemexpensive = items.some((item) => {
//   return item.price <= 100
// })

// does a function for each element in an Array
// items.foreach((item) => {
//   console.log(item.price)
// })

// find returns the first item in the array
// const foundItem = item.find((item) => {
//   return item.name === 'Album'
// })

// filter produces all that matches the said function
// const filteredItems = items.filter((item) => {
//   return item.price <= 100
// })

// bring out the values using key
// const itemNames = items.map((item) => {
//   return item.name
// })
