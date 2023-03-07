window.onload = function () {
    giveCards();
};

let values = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
let symbol = ["C", "D", "H", "S"]
let deck = [];
let playerDeck = [];
let enemyDeck = [];
let randomCard = [];
let cardTable = [];
let cardNumber;
let cardSymbol;
let numCardsOnTable;
let cardCountPlayer = 0;
let cardCountEnemy = 0;
let playerTurn = true;
let playerHit = false;
let playerAccept = false;
let enemyTurn = false;
let enemyAccept = false;
let enemyHit = false;


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

//give card to player and enemy
function giveCards() {
    //create trupju tuzi
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardNumber = !isNaN(card.charAt(0)) ? parseInt(card.substring(0, card.search("-"))) : card.substring(0, card.search("-"));
        cardSymbol = card.charAt(card.length - 1)
        cardImg.src = "assets/cardimg/" + card + ".png";
        cardImg.id = "maste";
        cardImg.dataset.value = card;
        document.getElementById("w20").append(cardImg);
        randomCard.push(card);
        console.log(cardNumber);
        console.log(cardSymbol);
    }
    console.log(randomCard);

    if (cardSymbol === "C") {
        cardSymbol > "D";
        cardSymbol > "H";
        cardSymbol > "S";
    } else if (cardSymbol === "D") {
        cardSymbol > "C";
        cardSymbol > "H";
        cardSymbol > "S";
    } else if (cardSymbol === "H") {
        cardSymbol > "C";
        cardSymbol > "D";
        cardSymbol > "S";
    } else if (cardSymbol === "S") {
        cardSymbol > "C";
        cardSymbol > "H";
        cardSymbol > "D";
    }

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
    let playerStuff;
    for (i of playerCards) {
        i.addEventListener("click", playerStuff = function playerFunction() {
            if (playerTurn === false && playerHit === true) {
                console.log(this.dataset.value);
                playerPrevOnTable = this.dataset.value;

                playerCardNum = !isNaN(playerPrevOnTable.charAt(0)) ? parseInt(playerPrevOnTable.substring(0, playerPrevOnTable.search("-"))) : playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));

                if (playerCardNum === "A") {
                    playerCardNum = "14";
                } else if (playerCardNum === "K") {
                    playerCardNum = "13";
                } else if (playerCardNum === "Q") {
                    playerCardNum = "12";
                } else if (playerCardNum === "J") {
                    playerCardNum = "11";
                }

                // playerCardNum = playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));
                playerCardSym = playerPrevOnTable.charAt(playerPrevOnTable.length - 1);
                console.log(playerCardNum);
                console.log(playerCardSym);

                if (playerCardSym == cardSymbol && enemyCardSym == cardSymbol && playerCardNum > enemyCardNum || playerCardNum > enemyCardNum && playerCardSym == enemyCardSym || playerCardSym == cardSymbol && enemyCardSym != cardSymbol) {

                    if (cardCountEnemy <= 0) {
                        console.log("Nav vairāk kāršu ko sist");
                    } else {
                        tableHit.append(this);
                        this.id = "none";
                        cardCountEnemy--;

                        cardTable.push(this.dataset.value);
                        console.log(cardTable);
                        for (let j = 0; j < playerDeck.length; j++) {
                            if (playerDeck[j] == this.dataset.value) {
                                playerDeck.splice(j, 1);
                            }
                        }
                    }
                } else {
                    console.log("mazāks");
                }

            } else if (playerTurn === true && playerHit === false) {
                if (playerPrevOnTable == "" || playerPrevOnTable.substring(0, playerPrevOnTable.search("-")) == this.dataset.value.substring(0, this.dataset.value.search("-")) || playerCardNum == enemyCardNum) {

                    cardCountPlayer = cardCountPlayer + 1;
                    console.log(cardCountPlayer);

                    for (let j = 0; j < playerDeck.length; j++) {
                        if (playerDeck[j] == this.dataset.value) {
                            playerDeck.splice(j, 1);
                        }
                    }



                    console.log(this.dataset.value);
                    playerPrevOnTable = this.dataset.value;
                    playerCardNum = !isNaN(playerPrevOnTable.charAt(0)) ? parseInt(playerPrevOnTable.substring(0, playerPrevOnTable.search("-"))) : playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));

                    if (playerCardNum === "A") {
                        playerCardNum = "14";
                    } else if (playerCardNum === "K") {
                        playerCardNum = "13";
                    } else if (playerCardNum === "Q") {
                        playerCardNum = "12";
                    } else if (playerCardNum === "J") {
                        playerCardNum = "11";
                    }

                    // playerCardNum = playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));
                    playerCardSym = playerPrevOnTable.charAt(playerPrevOnTable.length - 1);
                    console.log(playerCardNum);
                    console.log(playerCardSym);
                    console.log(playerDeck);

                    table.append(this);
                    this.id = "none";
                    cardTable.push(this.dataset.value);
                    console.log(cardTable);
                    this.removeEventListener('click', playerFunction);
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
        if (playerTurn === true && enemyHit === false) {
            enemyTurn = false;
            enemyHit = true;
            playerTurn = false;
            playerHit = false;
            console.log(playerTurn);
            let result = findHihgest(cardTable, enemyDeck);
            console.log(result);
            enemyPrevOnTable = "";
            playerPrevOnTable = "";
        }
    });

    //player accept enemy hit
    let playerHitedCards = document.getElementById("playerHited");
    playerHitedCards.addEventListener("click", function () {
        if (playerAccept == true) {
            enemyTurn = true;
            enemyHit = false;
            playerTurn = false;
            playerHit = false;

            while (cardTable.length) {
                cardTable.pop();
            }


            let noneCard = document.querySelectorAll("#none");
            let hitedCard = document.getElementById("hited");
            for (let i = 0; i < noneCard.length; i++) {
                hitedCard.appendChild(noneCard[i]).id = "card-hited";
            }

            console.log(cardTable);

            enemyPrevOnTable = "";
            playerPrevOnTable = "";


            // // if cards in hands is less than 6, automatically add more cards
            if (enemyDeck.length < 6) {
                for (let i = 0; i < (6 - enemyDeck.length); i++) {
                    let cardImg = document.createElement("img");
                    let card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "enemy-look";
                    cardImg.dataset.value = card;
                    document.getElementById("enemy-cards").append(cardImg);
                    cardImg.addEventListener("click", enemyStuff);
                    enemyDeck.push(card);
                    console.log(enemyDeck);
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
                    cardImg.addEventListener("click", playerStuff);
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
            let noneCard = document.querySelectorAll("#none");

            for (let i = 0; i < noneCard.length; i++) {
                playerTableCard.appendChild(noneCard[i]).id = "card-InHands";

                playerDeck = playerDeck.concat(cardTable);
                console.log(playerDeck);

                enemyTurn = true;
                enemyHit = false;
                playerTurn = false;
                playerHit = false;

                cardCountEnemy = 0;

                enemyPrevOnTable = "";
                playerPrevOnTable = "";

                // if cards in hands is less than 6, automatically add more cards
                if (enemyDeck.length < 6) {
                    for (let i = 0; i < 6 - enemyDeck.length; i++) {
                        let cardImg = document.createElement("img");
                        let card = deck.pop();
                        cardImg.src = "assets/cardimg/" + card + ".png";
                        cardImg.id = "enemy-look";
                        cardImg.dataset.value = card;
                        document.getElementById("enemy-cards").append(cardImg);
                        cardImg.addEventListener("click", enemyStuff);
                        enemyDeck.push(card);
                        console.log(enemyDeck);
                    }
                } else {
                    console.log("lenght=>6");
                }
            }
        }
    });

    //player hit end
    let playerHitCards = document.getElementById("playerHit");
    playerHitCards.addEventListener("click", function () {
        enemyTurn = true;
        enemyHit = false;
        enemyAccept = true;
        playerTurn = false;
        playerHit = false;


        enemyPrevOnTable = "";
        playerPrevOnTable = "";
    });



    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // create enemy deack
    for (let i = 0; i < 6; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "assets/cardimg/" + card + ".png";
        cardImg.id = "enemy-look";
        cardImg.dataset.value = card;
        document.getElementById("enemy-cards").append(cardImg);
        enemyDeck.push(card);
    }

    //print enemy cards
    console.log(enemyDeck);
    console.log("pretinieka karšu daudzums " + enemyDeck.length);

    //get eqaul enemy card
    let enemyEqual = getEquals(enemyDeck);
    console.log(enemyEqual);

    //drop enemy card on table
    let enemyCards = document.querySelectorAll("#enemy-look");
    let enemyPrevOnTable = "";
    let enemyCardNum = "";
    let enemyCardSym = "";
    let enemyStuff;
    for (i of enemyCards) {
        i.addEventListener("click", enemyStuff = function enemyFunction() {

            if (enemyTurn === false && enemyHit === true) {
                console.log(this.dataset.value);
                enemyPrevOnTable = this.dataset.value;

                enemyCardNum = !isNaN(enemyPrevOnTable.charAt(0)) ? parseInt(enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"))) : enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"));


                if (enemyCardNum === "A") {
                    enemyCardNum = "14";
                } else if (enemyCardNum === "K") {
                    enemyCardNum = "13";
                } else if (enemyCardNum === "Q") {
                    enemyCardNum = "12";
                } else if (enemyCardNum === "J") {
                    enemyCardNum = "11";
                }

                // enemyCardNum = enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"));
                enemyCardSym = enemyPrevOnTable.charAt(enemyPrevOnTable.length - 1);
                console.log(enemyCardNum);
                console.log(enemyCardSym);
                if (enemyCardSym == cardSymbol && playerCardSym == cardSymbol && enemyCardNum > playerCardNum || enemyCardNum > playerCardNum && enemyCardSym == playerCardSym || enemyCardSym == cardSymbol && playerCardSym != cardSymbol) {

                    if (cardCountPlayer <= 0) {
                        console.log("Nav vairāk kāršu ko sist");
                    } else {
                        tableHit.append(this);
                        this.id = "none";
                        cardCountPlayer--;

                        cardTable.push(this.dataset.value);
                        console.log(cardTable);
                        for (let j = 0; j < enemyDeck.length; j++) {
                            if (enemyDeck[j] == this.dataset.value) {
                                enemyDeck.splice(j, 1);
                            }
                        }
                    }
                } else {
                    console.log("mazāks");
                }
            } else if (enemyTurn === true && enemyHit === false) {
                if (enemyPrevOnTable == "" || enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-")) == this.dataset.value.substring(0, this.dataset.value.search("-")) || playerCardNum == enemyCardNum) {

                    cardCountEnemy = cardCountEnemy + 1;
                    console.log(cardCountEnemy);

                    for (let j = 0; j < enemyDeck.length; j++) {
                        if (enemyDeck[j] == this.dataset.value) {
                            enemyDeck.splice(j, 1);
                        }
                    }


                    this.id = "none";
                    table.append(this);

                    console.log(this.dataset.value);
                    console.log(enemyDeck);

                    enemyPrevOnTable = this.dataset.value;

                    enemyCardNum = !isNaN(enemyPrevOnTable.charAt(0)) ? parseInt(enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"))) : enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"));

                    if (enemyCardNum === "A") {
                        enemyCardNum = "14";
                    } else if (enemyCardNum === "K") {
                        enemyCardNum = "13";
                    } else if (enemyCardNum === "Q") {
                        enemyCardNum = "12";
                    } else if (enemyCardNum === "J") {
                        enemyCardNum = "11";
                    }

                    // enemyCardNum = enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"));
                    enemyCardSym = enemyPrevOnTable.charAt(enemyPrevOnTable.length - 1);
                    console.log(enemyCardNum);
                    console.log(enemyCardSym);
                    console.log(enemyDeck);
                    cardTable.push(this.dataset.value);
                    console.log(cardTable);
                    this.removeEventListener('click', enemyFunction);
                }
            } else {
                return;
            }
        });
    }


    //enemy pick up
    let enemyPickUp = document.getElementById("enemyPickUp");
    let enemyTableCard = document.getElementById("enemy-cards");

    enemyPickUp.addEventListener("click", function () {
        if (enemyTurn === false && enemyHit === true) {
            let noneCard = document.querySelectorAll("#none");
            for (let i = 0; i < noneCard.length; i++) {
                enemyTableCard.appendChild(noneCard[i]).id = "enemy-look";

                enemyDeck = enemyDeck.concat(cardTable);
                console.log(enemyDeck);



                enemyTurn = false;
                enemyHit = false;
                playerTurn = true;
                playerHit = false;
                
                cardCountPlayer = 0;

                enemyPrevOnTable = "";
                playerPrevOnTable = "";

                if (playerDeck.length < 6) {
                    for (let i = 0; i < 6 - playerDeck.length; i++) {
                        let cardImg = document.createElement("img");
                        let card = deck.pop();
                        cardImg.src = "assets/cardimg/" + card + ".png";
                        cardImg.id = "card-InHands";
                        cardImg.dataset.value = card;
                        document.getElementById("player-cards").append(cardImg);
                        cardImg.addEventListener("click", playerStuff);
                        playerDeck.push(card);
                        console.log(playerDeck);
                    }
                } else {
                    console.log("lenght=>6");
                }
            }
        }
    });

    //end enemyTurn
    let endenemyTurn = document.getElementById("endenemyTurn");
    endenemyTurn.addEventListener("click", function () {
        if (enemyTurn === true && enemyHit === false) {
            enemyTurn = false;
            enemyHit = false;
            playerTurn = false;
            playerHit = true;
            console.log(enemyTurn);
            enemyPrevOnTable = "";
            playerPrevOnTable = "";
        }
    });

    //enemy hit end
    let enemyHitCards = document.getElementById("enemyHit");
    enemyHitCards.addEventListener("click", function () {
        enemyTurn = false;
        enemyHit = false;
        playerTurn = true;
        playerHit = false;
        playerAccept = true;

        enemyPrevOnTable = "";
        playerPrevOnTable = "";
    });

    //enemy accept player hit
    let enemyHitedCards = document.getElementById("enemyHited");
    enemyHitedCards.addEventListener("click", function () {
        if (enemyAccept == true) {
            enemyTurn = false;
            enemyHit = false;
            playerTurn = true;
            playerHit = false;
            while (cardTable.length) {
                cardTable.pop();
            }

            let noneCard = document.querySelectorAll("#none");
            let hitedCard = document.getElementById("hited");
            for (let i = 0; i < noneCard.length; i++) {
                hitedCard.appendChild(noneCard[i]).id = "card-hited";
            }

            console.log(cardTable);


            enemyPrevOnTable = "";
            playerPrevOnTable = "";

            // // if cards in hands is less than 6, automatically add more cards
            if (enemyDeck.length < 6) {
                for (let i = 0; i < 6 - enemyDeck.length; i++) {
                    let cardImg = document.createElement("img");
                    let card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "enemy-look";
                    cardImg.dataset.value = card;
                    document.getElementById("enemy-cards").append(cardImg);
                    cardImg.addEventListener("click", enemyStuff);
                    enemyDeck.push(card);
                    console.log(enemyDeck);
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
                    cardImg.addEventListener("click", playerStuff);
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