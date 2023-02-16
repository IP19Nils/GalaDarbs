window.onload = function () {
  giveCards();
};

let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let symbol = ["C", "D", "H", "S"];
let deck = [];
let playerDeck = [];
let enamyDeck = [];
let randomCard = [];
let cardTable = [];
let playerTurn = true;
let enamyTurn = false;
let enamyHit = false;
let playerHit = false;
//create a deck
for (let i = 0; i < 4; i++) {
  for (let x = 0; x < 13; x++) {
    deck.push(values[x] + "-" + symbol[i]);
  }
}

//shuffle a deck
for (let i = 0; i < deck.length; i++) {
  let x = Math.floor(Math.random() * deck.length);
  let temp = deck[i];
  deck[i] = deck[x];
  deck[x] = temp;
}

//print out in console
console.log(deck);

/////////////////////////////////////////////////////////////////////////////////////////////////////

//give card to player and enamy
function giveCards() {
  //create trupju tuzi
  for (let i = 0; i < 1; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "assets/cardimg/" + card + ".png";
    cardImg.id = "maste";
    cardImg.dataset.value = card;
    document.getElementById("w20").append(cardImg);
    randomCard.push(card);
  }
  console.log(randomCard);

  //create player deck
  for (let i = 0; i < 6; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "assets/cardimg/" + card + ".png";
    cardImg.id = "card-InHands";
    cardImg.dataset.value = card;
    document.getElementById("player-cards").append(cardImg);
    playerDeck.push(card);
  }

  //print player card
  console.log(playerDeck);
  console.log("speletaja karsu daudzums " + playerDeck.length);

  //get eqaul player card
  let equal = getEquals(playerDeck);
  console.log(equal);

  //drop player card on table
  let playerCards = document.querySelectorAll("#card-InHands");
  let table = document.getElementById("placed-cards");
  let tableHit = document.getElementById("hit-cards");
  let playerPrevOnTable = "";
  let playerCardNum = "";
  let playerCardSym = "";
  for (i of playerCards) {
    i.addEventListener("click", function () {

      if (playerTurn === false && playerHit === true) {
        console.log(this.dataset.value);
        playerPrevOnTable = this.dataset.value;

        playerCardNum = playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));
        playerCardSym = playerPrevOnTable.charAt(playerPrevOnTable.length - 1);
        console.log(playerCardNum);
        console.log(playerCardSym);

        if (playerCardNum > enamyCardNum && enamyCardSym == playerCardSym) {


          tableHit.append(this);
          this.id = "none";


          cardTable.push(this.dataset.value);
          console.log(cardTable);
          for (let j = 0; j < playerDeck.length; j++) {
            if (playerDeck[j] == this.dataset.value) {
              playerDeck.splice(j, 1);
            }
          }
        } else {
          console.log("mazāks");
        }

      } else if (playerTurn === true && playerHit === false) {
        if (playerPrevOnTable == "" || playerPrevOnTable.substring(0, playerPrevOnTable.search("-")) == this.dataset.value.substring(0, this.dataset.value.search("-")) || playerCardNum == enamyCardNum) {
          table.append(this);

          this.id = "none";

          for (let j = 0; j < playerDeck.length; j++) {
            if (playerDeck[j] == this.dataset.value) {
              playerDeck.splice(j, 1);
            }
          }

          console.log(this.dataset.value);

          playerPrevOnTable = this.dataset.value;


          playerCardNum = playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));
          playerCardSym = playerPrevOnTable.charAt(playerPrevOnTable.length - 1);
          console.log(playerCardNum);
          console.log(playerCardSym);
          console.log(playerDeck);
          cardTable.push(this.dataset.value);
          console.log(cardTable);
        }
      } else {
        return;
      }
    });
  }


  console.log(playerTurn);
  //end playerTurn
  let endPlayerTurn = document.getElementById("endPlayerTurn");
  endPlayerTurn.addEventListener("click", function () {
    if (playerTurn === true && enamyHit === false) {
      enamyTurn = false;
      enamyHit = true;
      playerTurn = false;
      playerHit = false;
      console.log(playerTurn);
      let result = findHihgest(cardTable, enamyDeck);
      console.log(result);
    }
  });

  //player accept enmay hit
  let playerHitedCards = document.getElementById("playerHited");
  playerHitedCards.addEventListener("click", function () {
    if (playerTurn === true && playerHit === false) {
      enamyTurn = true;
      enamyHit = false;
      playerTurn = false;
      playerHit = false;

      while (cardTable.length) {
        cardTable.pop();
      }
      let noneCard = document.querySelector("#none");
      console.log(cardTable);
      let hitedCard = document.getElementById("hited");;
      hitedCard.append(noneCard);

      enamyPrevOnTable = "";

      // // if cards in hands is less than 6, automatically add more cards
      if (enamyDeck.length < 6) {
        for (let i = 0; i < 6 - enamyDeck.length; i++) {
          let cardImg = document.createElement("img");
          let card = deck.pop();
          cardImg.src = "assets/cardimg/" + card + ".png";
          cardImg.id = "enamy-look";
          cardImg.dataset.value = card;
          document.getElementById("enamy-cards").append(cardImg);
          enamyDeck.push(card);
          console.log(enamyDeck);
        }
      } else {
        console.log("lenght=>6");
      }

      // if cards in hands is less than 6, automatically add more cards
      if (playerDeck.length < 6) {
        for (let i = 0; i < 6 - playerDeck.length; i++) {
          let cardImg = document.createElement("img");
          let card = deck.pop();
          cardImg.src = "assets/cardimg/" + card + ".png";
          cardImg.id = "card-InHands";
          cardImg.dataset.value = card;
          document.getElementById("player-cards").append(cardImg);
          playerDeck.push(card);
          console.log(playerDeck);
        }
      } else {
        console.log("lenght=>6");
      }

      console.log(deck);
    }
  });

  //player pick up
  let playerPickUp = document.getElementById("playerPickUp");
  let playerTableCard = document.getElementById("player-cards");

  playerPickUp.addEventListener("click", function () {
    if (playerTurn === false && playerHit === true) {

      let noneCard = document.getElementById("none");
      playerTableCard.append(noneCard);

      playerDeck = playerDeck.concat(cardTable);
      console.log(playerDeck);
      console.log(noneCard);
      noneCard.id = "card-InHands";

      enamyTurn = true;
      enamyHit = false;
      playerTurn = false;
      playerHit = false;

      playerPrevOnTable = "";

      // // if cards in hands is less than 6, automatically add more cards
      if (enamyDeck.length < 6) {
        for (let i = 0; i < 6 - enamyDeck.length; i++) {
          let cardImg = document.createElement("img");
          let card = deck.pop();
          cardImg.src = "assets/cardimg/" + card + ".png";
          cardImg.id = "enamy-look";
          cardImg.dataset.value = card;
          document.getElementById("enamy-cards").append(cardImg);
          enamyDeck.push(card);
          console.log(enamyDeck);
        }
      } else {
        console.log("lenght=>6");
      }
    }
  });

  //player hit end
  let playerHitCards = document.getElementById("playerHit");
  playerHitCards.addEventListener("click", function () {
    enamyTurn = true;
    enamyHit = false;
    playerTurn = false;
    playerHit = false;
  });


  /////////////////////////////////////////////////////////////////////////////////////////////////////

  // create enamy deack
  for (let i = 0; i < 6; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "assets/cardimg/" + card + ".png";
    cardImg.id = "enamy-look";
    cardImg.dataset.value = card;
    document.getElementById("enamy-cards").append(cardImg);
    enamyDeck.push(card);
  }

  //print enamy cards
  console.log(enamyDeck);
  console.log("pretinieka karšu daudzums " + enamyDeck.length);

  //get eqaul enamy card
  let EnamyEqual = getEquals(enamyDeck);
  console.log(EnamyEqual);

  //drop enamy card on table
  let enamyCards = document.querySelectorAll("#enamy-look");
  let enamyPrevOnTable = "";
  let enamyCardNum = "";
  let enamyCardSym = "";

  for (i of enamyCards) {
    i.addEventListener("click", function () {

      if (enamyTurn === false && enamyHit === true) {
        console.log(this.dataset.value);
        enamyPrevOnTable = this.dataset.value;


        enamyCardNum = enamyPrevOnTable.substring(0, enamyPrevOnTable.search("-"));
        enamyCardSym = enamyPrevOnTable.charAt(enamyPrevOnTable.length - 1);
        console.log(enamyCardNum);
        console.log(enamyCardSym);

        if (enamyCardNum > playerCardNum && enamyCardSym == playerCardSym) {


          tableHit.append(this);
          this.id = "none";


          cardTable.push(this.dataset.value);
          console.log(cardTable);
          for (let j = 0; j < enamyDeck.length; j++) {
            if (enamyDeck[j] == this.dataset.value) {
              enamyDeck.splice(j, 1);
            }
          }
        } else {
          console.log("mazāks");
        }

      } else if (enamyTurn === true && enamyHit === false) {

        if (enamyPrevOnTable == "" || enamyPrevOnTable.substring(0, enamyPrevOnTable.search("-")) == this.dataset.value.substring(0, this.dataset.value.search("-"))) {
          table.append(this);
          this.id = "none";

          for (let j = 0; j < enamyDeck.length; j++) {
            if (enamyDeck[j] == this.dataset.value) {
              enamyDeck.splice(j, 1);
            }
          }
          console.log(this.dataset.value);
          console.log(enamyDeck);

          enamyPrevOnTable = this.dataset.value;


          enamyCardNum = enamyPrevOnTable.substring(0, enamyPrevOnTable.search("-"));
          enamyCardSym = enamyPrevOnTable.charAt(enamyPrevOnTable.length - 1);
          console.log(enamyCardNum);
          console.log(enamyCardSym);
          console.log(enamyDeck);
          cardTable.push(this.dataset.value);
          console.log(cardTable);
        }
      } else {
        return;
      }
    });
  }


  //enamy pick up
  let enamyPickUp = document.getElementById("enamyPickUp");
  let enamyTableCard = document.getElementById("enamy-cards");

  enamyPickUp.addEventListener("click", function () {
    if (enamyTurn === false && enamyHit === true) {
      let noneCard = document.getElementById("none");
      enamyTableCard.append(noneCard);

      enamyDeck = enamyDeck.concat(cardTable);
      console.log(enamyDeck);
      console.log(noneCard);
      noneCard.id = "enamy-look";

      enamyTurn = false;
      enamyHit = false;
      playerTurn = true;
      playerHit = false;


      // if cards in hands is less than 6, automatically add more cards
      if (playerDeck.length < 6) {
        for (let i = 0; i < 6 - playerDeck.length; i++) {
          let cardImg = document.createElement("img");
          let card = deck.pop();
          cardImg.src = "assets/cardimg/" + card + ".png";
          cardImg.id = "card-InHands";
          cardImg.dataset.value = card;
          document.getElementById("player-cards").append(cardImg);
          playerDeck.push(card);
          console.log(playerDeck);
        }
      } else {
        console.log("lenght=>6");
      }
    }
  });

  //end enamyTurn
  let endEnamyTurn = document.getElementById("endEnamyTurn");
  endEnamyTurn.addEventListener("click", function () {
    if (enamyTurn === true && enamyHit === false) {
      enamyTurn = false;
      enamyHit = false;
      playerTurn = false;
      playerHit = true;
      console.log(enamyTurn);
      playerPrevOnTable = "";
    }
  });

  //enamy hit end
  let enamyHitCards = document.getElementById("enamyHit");
  enamyHitCards.addEventListener("click", function () {
    enamyTurn = false;
    enamyHit = false;
    playerTurn = true;
    playerHit = false;
  });

  //enamy accept enmay hit
  let enamyHitedCards = document.getElementById("enamyHited");
  enamyHitedCards.addEventListener("click", function () {
    if (enamyTurn === true && enamyHit === false) {
      enamyTurn = false;
      enamyHit = false;
      playerTurn = true;
      playerHit = false;
      while (cardTable.length) {
        cardTable.pop();
      }
      let noneCard = document.querySelector("#none");
      console.log(cardTable);
      let hitedCard = document.getElementById("hited");;
      hitedCard.append(noneCard);

      enamyPrevOnTable = "";

      // // if cards in hands is less than 6, automatically add more cards
      if (enamyDeck.length < 6) {
        for (let i = 0; i < 6 - enamyDeck.length; i++) {
          let cardImg = document.createElement("img");
          let card = deck.pop();
          cardImg.src = "assets/cardimg/" + card + ".png";
          cardImg.id = "enamy-look";
          cardImg.dataset.value = card;
          document.getElementById("enamy-cards").append(cardImg);
          enamyDeck.push(card);
          console.log(enamyDeck);
        }
      } else {
        console.log("lenght=>6");
      }

      // if cards in hands is less than 6, automatically add more cards
      if (playerDeck.length < 6) {
        for (let i = 0; i < 6 - playerDeck.length; i++) {
          let cardImg = document.createElement("img");
          let card = deck.pop();
          cardImg.src = "assets/cardimg/" + card + ".png";
          cardImg.id = "card-InHands";
          cardImg.dataset.value = card;
          document.getElementById("player-cards").append(cardImg);
          playerDeck.push(card);
          console.log(playerDeck);
        }
      } else {
        console.log("lenght=>6");
      }
      console.log(deck);
    }
  });

//surrender
let endGame = document.getElementById("surr");
endGame.addEventListener("click", function () {
    window.location = "menu.php";
});
}

//fuction for geting equal cards
function getEquals(arr) {
  let arrPos = 0;
  let eq = [];

  for (let i = 0; i < arr.length; i++) {
    let index = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].charAt(0) == arr[j].charAt(0)) {
        index++;
        if (index == 2) {
          eq[arrPos] = arr[i];
          arrPos++;
        }
      }
    }
  }

  return eq;
}

function findHihgest(arr1, arr2) {
  let result = [];
  for (let i = 0; i < arr2.length; i++) {
    let highest = true;
    for (let j = 0; j < arr1.length; j++) {
      if (arr2[i] < arr1[j]) {
        highest = false;
        break;
      }
    }
    if (highest) {
      result.push(arr2[i]);
    }
  }
  return result;
}