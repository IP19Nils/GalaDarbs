
let values = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
let symbol = ["C", "D", "H", "S"]
let deck = [];
let playerDeck = [];
let enemyDeck = [];
let randomCard = [];
let cardTable = [];
let cardImg;
let card;
let cardNumber;
let cardSymbol;
let playerCards;
let table;
let tableHit;
let endPlayerTurn;
let playerHitedCards;
let playerHitCards;
let playerPrevOnTable;
let playerCardNum;
let playerCardSym;
let enemyHitedCards;
let enemyHitCards;
let enemyCards;
let enemyPrevOnTable;
let enemyCardNum;
let enemyCardSym;
let enemyStuff;
let enemyPickUp;
let enemyTableCard;
let endenemyTurn;
let noneCard;
let hitedCard;
let lastCard;
let backCard;
let replaceToSym;
let playerStuff;
let numCardsOnTable;
let cardCountPlayer = 0;
let cardCountEnemy = 0;
let playerTurn = true;
let playerHit = false;
let playerAccept = false;
let enemyTurn = false;
let enemyAccept = false;
let enemyHit = false;

/////////////////////////////////////////////////////////////////////////////////////////////////////
function startGame() {
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
}

function dealCard() {
    for (let i = 0; i < 1; i++) {
        cardImg = document.createElement("img");
        card = deck.pop();
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
        cardImg = document.createElement("img");
        card = deck.pop();
        cardImg.src = "assets/cardimg/" + card + ".png";
        cardImg.id = "card-InHands";
        cardImg.dataset.value = card;
        document.getElementById("player-cards").append(cardImg);
        playerDeck.push(card)
    }

    //print player card
    console.log(playerDeck);
    console.log("speletaja karsu daudzums " + playerDeck.length);


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
}

function playerMoves() {
    //drop player card on table
    playerCards = document.querySelectorAll("#card-InHands");
    table = document.getElementById("placed-cards");
    tableHit = document.getElementById("hit-cards");
    playerPrevOnTable = "";
    playerCardNum = "";
    playerCardSym = "";
    playerStuff;
    for (i of playerCards) {
        i.addEventListener("click", playerStuff = playerFunction());
    }
}

function playerFunction() {
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
        if (this.id === "none") {
            this.removeEventListener('click', playerFunction);
        }
    } else if (playerTurn === true && playerHit === false) {
        console.log(playerCardNum);
        console.log(enemyCardNum);

        playerCardNum = !isNaN(this.dataset.value.charAt(0)) ? parseInt(this.dataset.value.substring(0, this.dataset.value.search("-"))) : this.dataset.value.substring(0, this.dataset.value.search("-"));
        if (playerCardNum === "A") {
            playerCardNum = "14";
        } else if (playerCardNum === "K") {
            playerCardNum = "13";
        } else if (playerCardNum === "Q") {
            playerCardNum = "12";
        } else if (playerCardNum === "J") {
            playerCardNum = "11";
        }
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

            // playerCardNum = playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));
            playerCardSym = playerPrevOnTable.charAt(playerPrevOnTable.length - 1);
            console.log(playerCardNum);
            console.log(playerCardSym);
            console.log(playerDeck);

            table.append(this);
            this.id = "none";
            cardTable.push(this.dataset.value);
            console.log(cardTable);
            if (this.id === "none") {
                this.removeEventListener('click', playerFunction);
            }
        }
    } else {
        return;
    }
};

function playerButtons() {
    //end playerTurn
    endPlayerTurn = document.getElementById("endPlayerTurn");
    endPlayerTurn.addEventListener("click", function () {
        if (playerTurn === true && enemyHit === false) {
            enemyTurn = false;
            enemyHit = true;
            playerTurn = false;
            playerHit = false;
            console.log(playerTurn);
        }
    });

    //player accept enemy hit
    playerHitedCards = document.getElementById("playerHited");
    playerHitedCards.addEventListener("click", function () {
        if (playerAccept == true) {
            enemyTurn = true;
            enemyHit = false;
            playerTurn = false;
            playerHit = false;

            while (cardTable.length) {
                cardTable.pop();
            }

            noneCard = document.querySelectorAll("#none");
            hitedCard = document.getElementById("hited");
            for (let i = 0; i < noneCard.length; i++) {
                hitedCard.appendChild(noneCard[i]).id = "card-hited";
            }

            console.log(cardTable);

            enemyPrevOnTable = "";
            playerPrevOnTable = "";

            // // if cards in hands is less than 6, automatically add more cards
            lastCard = document.getElementById("maste");
            if (enemyDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

            } else if (enemyDeck.length < 6 && deck.length == 0) {
                enemyDeck = enemyDeck.concat(randomCard);
                lastCard.addEventListener("click", enemyStuff);
                enemyTableCard.appendChild(lastCard).id = "enemy-look";

                backCard = document.getElementById("back");
                replaceToSym = document.getElementById("text-sym");
                backCard.style.display = "none";
                if (cardSymbol == "H") {
                    replaceToSym.innerHTML = "❤️";
                } else if (cardSymbol == "D") {
                    replaceToSym.innerHTML = "♦️";
                } else if (cardSymbol == "C") {
                    replaceToSym.innerHTML = "♣️";
                } else if (cardSymbol == "S") {
                    replaceToSym.style.color = "black";
                    replaceToSym.innerHTML = "♠️";
                }

            } else if (enemyDeck.length < 6) {
                for (let i = 0; i < (4 - enemyDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "card-InHands";
                    cardImg.dataset.value = card;
                    document.getElementById("player-cards").append(cardImg);
                    cardImg.addEventListener("click", enemyStuff);
                    enemyDeck.push(card);
                    console.log(enemyDeck);
                }
            } else {
                console.log("lenght=>6");
            }

            // if cards in hands is less than 6, automatically add more cards
            if (playerDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

            } else if (playerDeck.length < 6 && deck.length == 0) {
                playerDeck = playerDeck.concat(randomCard);
                lastCard.addEventListener("click", playerStuff);
                playerTableCard.appendChild(lastCard).id = "card-InHands";

                backCard = document.getElementById("back");
                replaceToSym = document.getElementById("text-sym");
                backCard.style.display = "none";
                if (cardSymbol == "H") {
                    replaceToSym.innerHTML = "❤️";
                } else if (cardSymbol == "D") {
                    replaceToSym.innerHTML = "♦️";
                } else if (cardSymbol == "C") {
                    replaceToSym.innerHTML = "♣️";
                } else if (cardSymbol == "S") {
                    replaceToSym.style.color = "black";
                    replaceToSym.innerHTML = "♠️";
                }

            } else if (playerDeck.length < 6) {
                for (let i = 0; i < (4 - playerDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "card-InHands";
                    cardImg.dataset.value = card; playerTableCard
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
    playerPickUp = document.getElementById("playerPickUp");
    playerTableCard = document.getElementById("player-cards");

    playerPickUp.addEventListener("click", function () {
        if (playerTurn === false && playerHit === true) {
            noneCard = document.querySelectorAll("#none");

            for (let i = 0; i < noneCard.length; i++) {
                noneCard[i].addEventListener("click", playerStuff);
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
                lastCard = document.getElementById("maste");
                if (enemyDeck.length < 6 && deck.length == 0 && lastCard == null) {
                    console.log("nav vairāk kāršu ko ņemt");

                } else if (enemyDeck.length < 6 && deck.length == 0) {
                    enemyDeck = enemyDeck.concat(randomCard);
                    lastCard.addEventListener("click", enemyStuff);
                    enemyTableCard.appendChild(lastCard).id = "enemy-look";

                    backCard = document.getElementById("back");
                    replaceToSym = document.getElementById("text-sym");
                    backCard.style.display = "none";
                    if (cardSymbol == "H") {
                        replaceToSym.innerHTML = "❤️";
                    } else if (cardSymbol == "D") {
                        replaceToSym.innerHTML = "♦️";
                    } else if (cardSymbol == "C") {
                        replaceToSym.innerHTML = "♣️";
                    } else if (cardSymbol == "S") {
                        replaceToSym.style.color = "black";
                        replaceToSym.innerHTML = "♠️";
                    }

                } else if (enemyDeck.length < 6) {
                    for (let i = 0; i < (4 - enemyDeck.length); i++) {
                        cardImg = document.createElement("img");
                        card = deck.pop();
                        cardImg.src = "assets/cardimg/" + card + ".png";
                        cardImg.id = "card-InHands";
                        cardImg.dataset.value = card;
                        document.getElementById("player-cards").append(cardImg);
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
    playerHitCards = document.getElementById("playerHit");
    playerHitCards.addEventListener("click", function () {
        enemyTurn = true;
        enemyHit = false;
        enemyAccept = true;
        playerTurn = false;
        playerHit = false;
    });
}

function enamyMoves() {
    //drop enemy card on table
    enemyCards = document.querySelectorAll("#enemy-look");
    enemyPrevOnTable = "";
    enemyCardNum = "";
    enemyCardSym = "";
    enemyStuff;
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
                if (this.id === "none") {
                    this.removeEventListener('click', enemyFunction);
                }
            } else if (enemyTurn === true && enemyHit === false) {

                enemyCardNum = !isNaN(this.dataset.value.charAt(0)) ? parseInt(this.dataset.value.substring(0, this.dataset.value.search("-"))) : this.dataset.value.substring(0, this.dataset.value.search("-"));

                if (enemyCardNum === "A") {
                    enemyCardNum = "14";
                } else if (enemyCardNum === "K") {
                    enemyCardNum = "13";
                } else if (enemyCardNum === "Q") {
                    enemyCardNum = "12";
                } else if (enemyCardNum === "J") {
                    enemyCardNum = "11";
                }

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

                    // enemyCardNum = enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"));
                    enemyCardSym = enemyPrevOnTable.charAt(enemyPrevOnTable.length - 1);
                    console.log(enemyCardNum);
                    console.log(enemyCardSym);
                    console.log(enemyDeck);
                    cardTable.push(this.dataset.value);
                    console.log(cardTable);
                    if (this.id === "none") {
                        this.removeEventListener('click', enemyFunction);
                    }
                }
            } else {
                return;
            }
        });
    }
}

function enamyButtons() {
    //enemy pick up
    enemyPickUp = document.getElementById("enemyPickUp");
    enemyTableCard = document.getElementById("enemy-cards");

    enemyPickUp.addEventListener("click", function () {
        if (enemyTurn === false && enemyHit === true) {
            noneCard = document.querySelectorAll("#none");
            for (let i = 0; i < noneCard.length; i++) {
                noneCard[i].addEventListener("click", enemyStuff);
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

                lastCard = document.getElementById("maste");
                if (playerDeck.length < 6 && deck.length == 0 && lastCard == null) {
                    console.log("nav vairāk kāršu ko ņemt");

                } else if (playerDeck.length < 6 && deck.length == 0) {
                    playerDeck = playerDeck.concat(randomCard);
                    lastCard.addEventListener("click", playerStuff);
                    playerTableCard.appendChild(lastCard).id = "card-InHands";

                    backCard = document.getElementById("back");
                    replaceToSym = document.getElementById("text-sym");
                    backCard.style.display = "none";
                    if (cardSymbol == "H") {
                        replaceToSym.innerHTML = "❤️";
                    } else if (cardSymbol == "D") {
                        replaceToSym.innerHTML = "♦️";
                    } else if (cardSymbol == "C") {
                        replaceToSym.innerHTML = "♣️";
                    } else if (cardSymbol == "S") {
                        replaceToSym.style.color = "black";
                        replaceToSym.innerHTML = "♠️";
                    }

                } else if (playerDeck.length < 6) {
                    for (let i = 0; i < (4 - playerDeck.length); i++) {
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
    endenemyTurn = document.getElementById("endenemyTurn");
    endenemyTurn.addEventListener("click", function () {
        if (enemyTurn === true && enemyHit === false) {
            enemyTurn = false;
            enemyHit = false;
            playerTurn = false;
            playerHit = true;
            console.log(enemyTurn);
        }
    });

    //enemy hit end
    enemyHitCards = document.getElementById("enemyHit");
    enemyHitCards.addEventListener("click", function () {
        enemyTurn = false;
        enemyHit = false;
        playerTurn = true;
        playerHit = false;
        playerAccept = true;

    });

    //enemy accept player hit
    enemyHitedCards = document.getElementById("enemyHited");
    enemyHitedCards.addEventListener("click", function () {
        if (enemyAccept == true) {
            enemyTurn = false;
            enemyHit = false;
            playerTurn = true;
            playerHit = false;
            while (cardTable.length) {
                cardTable.pop();
            }

            noneCard = document.querySelectorAll("#none");
            hitedCard = document.getElementById("hited");
            for (let i = 0; i < noneCard.length; i++) {
                hitedCard.appendChild(noneCard[i]).id = "card-hited";
            }

            console.log(cardTable);


            enemyPrevOnTable = "";
            playerPrevOnTable = "";

            // // if cards in hands is less than 6, automatically add more cards
            lastCard = document.getElementById("maste");
            if (enemyDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

            } else if (enemyDeck.length < 6 && deck.length == 0) {
                enemyDeck = enemyDeck.concat(randomCard);
                lastCard.addEventListener("click", enemyStuff);
                enemyTableCard.appendChild(lastCard).id = "enemy-look";

                backCard = document.getElementById("back");
                replaceToSym = document.getElementById("text-sym");
                backCard.style.display = "none";
                if (cardSymbol == "H") {
                    replaceToSym.innerHTML = "❤️";
                } else if (cardSymbol == "D") {
                    replaceToSym.innerHTML = "♦️";
                } else if (cardSymbol == "C") {
                    replaceToSym.innerHTML = "♣️";
                } else if (cardSymbol == "S") {
                    replaceToSym.style.color = "black";
                    replaceToSym.innerHTML = "♠️";
                }

            } else if (enemyDeck.length < 6) {
                for (let i = 0; i < (4 - enemyDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "card-InHands";
                    cardImg.dataset.value = card;
                    document.getElementById("player-cards").append(cardImg);
                    cardImg.addEventListener("click", enemyStuff);
                    enemyDeck.push(card);
                    console.log(enemyDeck);
                }
            } else {
                console.log("lenght=>6");
            }

            // if cards in hands is less than 6, automatically add more cards
            if (playerDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

            } else if (playerDeck.length < 6 && deck.length == 0) {
                playerDeck = playerDeck.concat(randomCard);
                lastCard.addEventListener("click", playerStuff);
                playerTableCard.appendChild(lastCard).id = "card-InHands";

                backCard = document.getElementById("back");
                replaceToSym = document.getElementById("text-sym");
                backCard.style.display = "none";
                if (cardSymbol == "H") {
                    replaceToSym.innerHTML = "❤️";
                } else if (cardSymbol == "D") {
                    replaceToSym.innerHTML = "♦️";
                } else if (cardSymbol == "C") {
                    replaceToSym.innerHTML = "♣️";
                } else if (cardSymbol == "S") {
                    replaceToSym.style.color = "black";
                    replaceToSym.innerHTML = "♠️";
                }

            } else if (playerDeck.length < 6) {
                for (let i = 0; i < (4 - playerDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
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
}

function surrender() {
    //surrender
    let endGame = document.getElementById("surr");
    endGame.addEventListener("click", function () {
        window.location = "menu.php";
    });
}


