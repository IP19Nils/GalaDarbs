const deck = [];
const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
const values = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Populate the deck
for (let suit of suits) {
  for (let value of values) {
    deck.push({ value, suit });
  }
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Deal cards to players
function dealCards(deck, players) {
  for (let i = 0; i < deck.length; i++) {
    players[i % players.length].push(deck[i]);
  }
}

// Check if a card can beat the top card in the middle
function canBeat(card, topCard) {
  return values.indexOf(card.value) > values.indexOf(topCard.value);
}

// Place a card in the middle
function placeCard(card, middle) {
  middle.push(card);
}

// Example usage
let middle = [];
let player1 = [];
let player2 = [];

deck = shuffleDeck(deck);
dealCards(deck, [player1, player2]);

let player1Card = player1[0];
let player2Card = player2[0];

if (canBeat(player1Card, player2Card)) {
  placeCard(player1Card, middle);
  player1.splice(0, 1);
} else {
  placeCard(player2Card, middle);
  player2.splice(0, 1);
}

console.log('Middle: ', middle);
console.log('Player 1: ', player1);
console.log('Player 2: ', player2);


  /////////////////////////////////////////////////////////////////////////////////////////

function getSuit(card) {
    return card.split(" ")[2];
  }
  
  // Compares two cards to determine the winner
  function compareCards(card1, card2) {
    let value1 = getValue(card1);
    let value2 = getValue(card2);
    let suit1 = getSuit(card1);
    let suit2 = getSuit(card2);
  
    if (value1 === value2) {
      if (suit1 === trumpSuit && suit2 !== trumpSuit) {
        return card1;
      } else if (suit2 === trumpSuit && suit1 !== trumpSuit) {
        return card2;
      } else {
        return false;
      }
    } else if (
      (value1 === "J" && suit1 === trumpSuit) ||
      (value2 === "J" && suit2 === trumpSuit)
    ) {
      return false;
    } else if (values.indexOf(value1) > values.indexOf(value2)) {
      return card1;
    } else {
      return card2;
    }
  }
  
  // The game logic
  function playGame() {
    createDeck();
    shuffleDeck();
    dealCards();
    setTrumpSuit();
  
    while (playerCards.length > 0 && computerCards.length > 0) {
      attackCard = playerCards.shift();
      defendCard = computerCards.shift();
      let winner = compareCards(attackCard, defendCard);
  
      if (winner === attackCard) {
        playerCards.push(attackCard);
        playerCards.push(defendCard);
      } else if (winner === defendCard) {
        computerCards.push(attackCard);
        computerCards.push(defendCard);
      } else {
        playerCards.push(attackCard);
        computerCards.push(defendCard);
      }
    }
  
    if (playerCards.length === 0) {
      alert("Computer wins!");
    } else if (computerCards.length === 0) {
      alert("Player wins!");
    }
  }
  
  // Event listener for start game button
  document.querySelector("#start-game").addEventListener("click", playGame);

  /////////////////////////////////////////////////////////////////////////////////////////

  let deck = [];
for (let i = 6; i <= 14; i++) {
    for (let j = 0; j < 4; j++) {
        deck.push(i + "-" + j);
    }
}

// Shuffle deck of cards
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Function to deal cards to players
function dealCards(deck, players) {
    let cardsPerPlayer = deck.length / players.length;
    for (let i = 0; i < players.length; i++) {
        players[i].hand = deck.splice(0, cardsPerPlayer);
    }
    return { deck, players };
}

// Function to place card in center
function placeCard(card, center) {
    center.push(card);
    return center;
}

// Function to compare cards and determine if hit is valid
function compareCards(playedCard, centerCard) {
    let playedCardValue = playedCard.split("-")[0];
    let centerCardValue = centerCard.split("-")[0];
    return playedCardValue > centerCardValue;
}

// Example usage
let center = [];
let players = [    { name: "Player 1", hand: [] },
    { name: "Player 2", hand: [] },
];

deck = shuffle(deck);
let game = dealCards(deck, players);
deck = game.deck;
players = game.players;

let player1Card = players[0].hand[0];
let player2Card = players[1].hand[0];

if (compareCards(player1Card, player2Card)) {
    center = placeCard(player1Card, center);
    players[0].hand.splice(0, 1);
} else {
    center = placeCard(player2Card, center);
    players[1].hand.splice(0, 1);
}

console.log(center);
console.log(players);

//////////////////////////////////////////////////////////////////////////////////////////

// Shuffle the deck of cards
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Deal cards to the player and computer
function dealCards(deck) {
  return [deck.splice(0, deck.length / 2), deck];
}

// Check if a card can beat another card
function canBeat(card1, card2) {
  const value1 = card1.split('-')[0];
  const value2 = card2.split('-')[0];
  return value1 > value2;
}

// Place a card in the center pile
function placeCard(card, centerPile) {
  centerPile.push(card);
  return centerPile;
}

// Computer player logic to choose a card
function playCard(hand, centerPile) {
  for (let i = 0; i < hand.length; i++) {
    if (canBeat(hand[i], centerPile[centerPile.length - 1])) {
      return hand.splice(i, 1)[0];
    }
  }
  return hand.shift();
}

// Example usage
const shuffledDeck = shuffleDeck(deck);
const [playerHand, computerHand] = dealCards(shuffledDeck);
let centerPile = [];

// Player places a card
centerPile = placeCard(playerHand.shift(), centerPile);

// Computer places a card
const computerCard = playCard(computerHand, centerPile);
centerPile = placeCard(computerCard, centerPile);

console.log(centerPile);
console.log(playerHand);
console.log(computerHand);