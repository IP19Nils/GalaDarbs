window.onload = function () {
    createMainCard();
    playerDeckCard();
    playerMoves();
    playerEndTurn();
    playerAcceptCards();
    playerPickUpCard();
    playerHitEnd();
    EnemyDeckCard();
    enemyMoves();
    enemyPickUpCard();
    enemyTurnEnd();
    enemyHitEnd();
    enemyAcceptCards();
    GameEnd();
};

let appendedCard;
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
let playerTableCard;
let playerPrevOnTable;
let playerCardNum;
let playerCardSym;
let enemyCards;
let enemyPrevOnTable;
let enemyCardNum;
let enemyCardSym;
let enemyStuff;
let enemyPickUp;
let enemyTableCard;
let endEnemyTurn;
let noneCard;
let hittedCard;
let lastCard;
let backCard;
let replaceToSym;
let playerStuff;
let cardCountPlayer = 0;
let cardCountEnemy = 0;
let spiltValues;
let firstValue;
let secondValue;
let compare;
let playerTurn = true;
let playerHit = false;
let playerAccept = false;
let enemyTurn = false;
let enemyAccept = false;
let enemyHit = false;
let sendCard;
let appendCardArray = [];
let sendCards = [];

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
    console.log('WebSocket connection established.');
};

socket.onmessage = (event) => {
    // Process the received message from the server

    const message = JSON.parse(event.data);
    console.log('Received message:', message);


    if (message.type == "deck") {
        deck = message.data;
    }
    if (message.type == "playerDeck") {
        playerDeck = message.data;
    }
    if (message.type == "enemyDeck") {
        enemyDeck = message.data;
    }
    if (message.type == "mainCard") {
        randomCard = message.data;
    }
    if (message.type == "sendCard") {
        sendCards = message.data;

        for (let i = 0; i < sendCards.length; i++) {
            let newCard = sendCards[i];
            console.log(newCard);
            cardImg = document.createElement("img");
            cardImg.src = "assets/cardimg/" + newCard + ".png";
            cardImg.id = "none";
            cardImg.dataset.value = newCard;
            document.getElementById("placed-cards").append(cardImg);
        }
    }
    console.log(sendCards);
};

socket.onclose = () => {
    console.log('WebSocket connection closed.');
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

//create trupju tuzi
function createMainCard() {
    for (let i = 0; i < 1; i++) {
        let newCard = randomCard[i];
        cardImg = document.createElement("img");
        // cardNumber = !isNaN(card.charAt(0)) ? parseInt(card.substring(0, card.search("-"))) : card.substring(0, card.search("-"));
        cardSymbol = newCard.charAt(newCard.length - 1)
        cardImg.src = "assets/cardimg/" + newCard + ".png";
        cardImg.id = "maste";
        cardImg.dataset.value = newCard;
        document.getElementById("w20").append(cardImg);
        // console.log("Trumpju kārts cipars " + cardNumber);
        console.log("Trumpju kārts simbols " + cardSymbol);
    }
    console.log("Trumpju kārts " + randomCard);

    //salīdzina ar ko vienāds simbols un padara to lielāko par pārejiem
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
}

//create player deck
function playerDeckCard() {
    for (let i = 0; i < 6; i++) {
        let newCard = playerDeck[i];
        cardImg = document.createElement("img");
        cardImg.src = "assets/cardimg/" + newCard + ".png";
        cardImg.id = "card-InHands";
        cardImg.dataset.value = newCard;
        document.getElementById("player-cards").append(cardImg);
    }

    //print player card
    console.log("speletaja kārtis " + playerDeck);
    console.log("speletaja karsu daudzums " + playerDeck.length);
}


//drop player card on table
function playerMoves() {
    playerCards = document.querySelectorAll("#card-InHands");
    table = document.getElementById("placed-cards");
    tableHit = document.getElementById("hit-cards");
    playerPrevOnTable = "";
    playerCardNum = "";
    playerCardSym = "";
    for (i of playerCards) {
        i.addEventListener("click", playerStuff = function playerFunction() {
            if (playerTurn === false && playerHit === true) {
                playerPrevOnTable = this.dataset.value;

                //parbauda un parveido virkni par ciparu
                playerCardNum = !isNaN(playerPrevOnTable.charAt(0)) ? parseInt(playerPrevOnTable.substring(0, playerPrevOnTable.search("-"))) : playerPrevOnTable.substring(0, playerPrevOnTable.search("-"));

                //pievieno vērtības lielākām kārtīm par 10 lai var salīdzīnāt ar cipariem
                if (playerCardNum === "A") {
                    playerCardNum = "14";
                } else if (playerCardNum === "K") {
                    playerCardNum = "13";
                } else if (playerCardNum === "Q") {
                    playerCardNum = "12";
                } else if (playerCardNum === "J") {
                    playerCardNum = "11";
                }

                //paņem kārts pēdejo rakszīmi kas ir simbols
                playerCardSym = playerPrevOnTable.charAt(playerPrevOnTable.length - 1);

                //tiek veiktas pārbaudes
                if (playerCardSym == cardSymbol && enemyCardSym == cardSymbol && playerCardNum > enemyCardNum || playerCardNum > enemyCardNum && playerCardSym == enemyCardSym || playerCardSym == cardSymbol && enemyCardSym != cardSymbol) {

                    console.log("uzpieztās kārts " + this.dataset.value);
                    console.log("uzpieztās kārts cipars " + playerCardNum);
                    console.log("uzpieztās kārts simbols " + playerCardSym);

                    //parbauda cik kāršu var sist
                    if (cardCountEnemy <= 0) {
                        console.log("Nav vairāk kāršu ko sist");
                    } else {
                        tableHit.append(this);
                        this.id = "none";
                        cardCountEnemy--;

                        cardTable.push(this.dataset.value);
                        console.log("kārtis uz galda " + cardTable);
                        for (let j = 0; j < playerDeck.length; j++) {
                            if (playerDeck[j] == this.dataset.value) {
                                playerDeck.splice(j, 1);
                            }
                        }
                    }
                    if (this.id === "none") {
                        //noņem nost no kārts eventListener
                        this.removeEventListener('click', playerFunction);
                    }
                } else if (cardCountEnemy > 1) {
                    for (let j = 0; j < cardTable.length; j++) {
                        spiltValues = cardTable[j].split("-");
                        firstValue = spiltValues[0];
                        secondValue = spiltValues[1];
                        for (let j = 0; j < cardTable.length; j++) {
                            if (playerCardNum > firstValue[j] && playerCardSym == secondValue[j]) {
                                tableHit.append(this);
                                this.id = "none";
                                cardCountEnemy--;
                                cardTable.push(this.dataset.value);
                                console.log("kārtis uz galda " + cardTable);
                                for (let j = 0; j < playerDeck.length; j++) {
                                    if (playerDeck[j] == this.dataset.value) {
                                        playerDeck.splice(j, 1);
                                    }
                                }
                                if (this.id === "none") {
                                    this.removeEventListener('click', playerFunction);
                                }
                            }
                        }
                        console.log(firstValue);
                        console.log(secondValue);
                    }
                } else {
                    console.log("mazāks");
                }
                console.log("spēlētāja kārtis tagad " + playerDeck);
            } else if (playerTurn === true && playerHit === false) {

                //parbauda un parveido virkni par ciparu
                playerCardNum = !isNaN(this.dataset.value.charAt(0)) ? parseInt(this.dataset.value.substring(0, this.dataset.value.search("-"))) : this.dataset.value.substring(0, this.dataset.value.search("-"));

                //pievieno vērtības lielākām kārtīm par 10 lai var salīdzīnāt ar cipariem
                if (playerCardNum === "A") {
                    playerCardNum = "14";
                } else if (playerCardNum === "K") {
                    playerCardNum = "13";
                } else if (playerCardNum === "Q") {
                    playerCardNum = "12";
                } else if (playerCardNum === "J") {
                    playerCardNum = "11";
                }

                //tiek veiktas pārbaudes
                for (let j = 0; j < cardTable.length; j++) {
                    spiltValues = cardTable[j].split("-");
                    firstValue = spiltValues[0];
                    secondValue = spiltValues[1];
                    if (playerCardNum == firstValue[j]) {
                        table.append(this);
                        this.id = "none";
                        for (let j = 0; j < playerDeck.length; j++) {
                            if (playerDeck[j] == this.dataset.value) {
                                playerDeck.splice(j, 1);
                            }
                        }
                        // console.log("kārtis uz galda " + cardTable);
                        if (this.id === "none") {
                            this.removeEventListener('click', playerFunction);
                        }
                    }
                    // console.log(firstValue);
                    // console.log(secondValue);
                }
                if (playerPrevOnTable == "" || playerPrevOnTable.substring(0, playerPrevOnTable.search("-")) == this.dataset.value.substring(0, this.dataset.value.search("-")) || playerCardNum == enemyCardNum) {

                    //veic skaitīšanu cik kāršu var sist
                    cardCountPlayer = cardCountPlayer + 1;
                    console.log("kāršu daudzums ko sist " + cardCountPlayer);

                    for (let j = 0; j < playerDeck.length; j++) {
                        if (playerDeck[j] == this.dataset.value) {
                            playerDeck.splice(j, 1);
                        }
                    }

                    console.log("uzpiestā kārts " + this.dataset.value);
                    playerPrevOnTable = this.dataset.value;

                    //paņem kārts pēdejo rakszīmi kas ir simbols
                    playerCardSym = playerPrevOnTable.charAt(playerPrevOnTable.length - 1);

                    console.log("uzpieztās kārts cipars " + playerCardNum);
                    console.log("uzpieztās kārts simbols " + playerCardSym);
                    console.log("spēlētāja kārtis tagad " + playerDeck);

                    console.log(this);
                    // table.append(this);
                    this.remove();

                    appendCardArray.push(this.dataset.value);

                    sendCard = {
                        "type": "sendCard",
                        "data": appendCardArray,
                    }


                    socket.send(JSON.stringify(sendCard));

                    this.id = "none";
                    cardTable.push(this.dataset.value);
                    console.log("kārtis uz galda " + cardTable);
                    if (this.id === "none") {
                        this.removeEventListener('click', playerFunction);
                    }
                }
            } else {
                return;
            }
        });
    }
}

//end playerTurn
function playerEndTurn() {
    console.log(playerTurn);
    endPlayerTurn = document.getElementById("endPlayerTurn");
    endPlayerTurn.addEventListener("click", function () {
        if (playerTurn === true && enemyHit === false) {
            enemyTurn = false;
            enemyHit = true;
            playerTurn = false;
            playerHit = false;
            console.log("spēlētāja gājiens " + playerTurn);
            console.log(enemyPrevOnTable);
            console.log(playerPrevOnTable);
            console.log("kārtis uz galda " + cardTable);
        }
    });
}

//player accept enemy hit
function playerAcceptCards() {
    lastCard = document.getElementById("maste");
    let playerhittedCards = document.getElementById("playerHited");
    playerTableCard = document.getElementById("player-cards");
    enemyTableCard = document.getElementById("enemy-cards");
    playerhittedCards.addEventListener("click", function () {
        if (playerAccept == true) {
            enemyTurn = true;
            enemyHit = false;
            playerTurn = false;
            playerHit = false;

            //izmet ārā kārtis no masīva
            while (cardTable.length) {
                cardTable.pop();
            }

            //atment visas kārtis kas atrodas uz galda
            noneCard = document.querySelectorAll("#none");
            hittedCard = document.getElementById("hited");
            for (let i = 0; i < noneCard.length; i++) {
                hittedCard.appendChild(noneCard[i]).id = "card-hited";
            }

            enemyPrevOnTable = "";
            playerPrevOnTable = "";

            //ja kārtis nav palikušas izvada konsolē tikai tekstu
            if (enemyDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

                //ja ir palikusi pati pēdēja kārts trumpe tad tiek paņemta tikai tā un nomainīta pret simbolu
            } else if (enemyDeck.length < 6 && deck.length == 0) {
                enemyDeck = enemyDeck.concat(randomCard);
                lastCard.addEventListener("click", enemyStuff);
                enemyTableCard.appendChild(lastCard).id = "enemy-look";

                //aizvāc prom kārts muguru un pievieno simbolu
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

                //ja kārtis ir vienkārši mazāk par 6 tiek pievienotas jaunas
            } else if (enemyDeck.length < 6) {
                for (let i = 0; i < (7 - enemyDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "enemy-look";
                    cardImg.dataset.value = card;
                    document.getElementById("enemy-cards").append(cardImg);
                    //pievieno enventListener ar visām vaidzīgām funkcijām
                    cardImg.addEventListener("click", enemyStuff);
                    enemyDeck.push(card);
                }
                console.log("atjaunotās pretinieka kārtis " + enemyDeck);
                console.log("pretinieka karsu daudzums " + enemyDeck.length);
            } else {
                console.log("lenght=>6");
            }

            //ja kārtis nav palikušas izvada konsolē tikai tekstu
            if (playerDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

                //ja ir palikusi pati pēdēja kārts trumpe tad tiek paņemta tikai tā un nomainīta pret simbolu
            } else if (playerDeck.length < 6 && deck.length == 0) {
                playerDeck = playerDeck.concat(randomCard);
                lastCard.addEventListener("click", playerStuff);
                playerTableCard.appendChild(lastCard).id = "card-InHands";

                //aizvāc prom kārts muguru un pievieno simbolu
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

                //ja kārtis ir vienkārši mazāk par 6 tiek pievienotas jaunas
            } else if (playerDeck.length < 6) {
                for (let i = 0; i < (7 - playerDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "card-InHands";
                    cardImg.dataset.value = card;
                    document.getElementById("player-cards").append(cardImg);
                    cardImg.addEventListener("click", playerStuff);
                    playerDeck.push(card);
                }
                console.log("atjaunotās spēlētāja kārtis " + playerDeck);
                console.log("speletaja karsu daudzums " + playerDeck.length);
            } else {
                console.log("lenght=>6");
            }
            console.log(deck);
            playerAccept = false;
        }
    });
}

//player pick up
function playerPickUpCard() {
    lastCard = document.getElementById("maste");
    playerPickUp = document.getElementById("playerPickUp");
    enemyTableCard = document.getElementById("enemy-cards");
    playerTableCard = document.getElementById("player-cards");

    playerPickUp.addEventListener("click", function () {
        if (playerTurn === false && playerHit === true) {
            noneCard = document.querySelectorAll("#none");

            //paņem visas kārtis un pievieno pie spēlētāja deck
            for (let i = 0; i < noneCard.length; i++) {
                noneCard[i].addEventListener("click", playerStuff);
                playerTableCard.appendChild(noneCard[i]).id = "card-InHands";

                playerDeck = playerDeck.concat(cardTable);
                console.log("spēlētāja kārtis tagad " + playerDeck);

                enemyTurn = true;
                enemyHit = false;
                playerTurn = false;
                playerHit = false;

                cardCountEnemy = 0;

                enemyPrevOnTable = "";
                playerPrevOnTable = "";

                //ja kārtis nav palikušas izvada konsolē tikai tekstu
                if (enemyDeck.length < 6 && deck.length == 0 && lastCard == null) {
                    console.log("nav vairāk kāršu ko ņemt");

                    //ja ir palikusi pati pēdēja kārts trumpe tad tiek paņemta tikai tā un nomainīta pret simbolu
                } else if (enemyDeck.length < 6 && deck.length == 0) {
                    enemyDeck = enemyDeck.concat(randomCard);
                    lastCard.addEventListener("click", enemyStuff);
                    enemyTableCard.appendChild(lastCard).id = "enemy-look";
                    lastCard = null;

                    //aizvāc prom kārts muguru un pievieno simbolu
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

                    //ja kārtis ir vienkārši mazāk par 6 tiek pievienotas jaunas
                } else if (enemyDeck.length < 6) {
                    for (let i = 0; i < (7 - enemyDeck.length); i++) {
                        cardImg = document.createElement("img");
                        card = deck.pop();
                        cardImg.src = "assets/cardimg/" + card + ".png";
                        cardImg.id = "enemy-look";
                        cardImg.dataset.value = card;
                        document.getElementById("enemy-cards").append(cardImg);
                        cardImg.addEventListener("click", enemyStuff);
                        enemyDeck.push(card);
                    }
                    console.log("pretinieka kārtis tagad" + enemyDeck);
                } else {
                    console.log("lenght=>6");
                }
            }
        }
    });
}


//player hit end
function playerHitEnd() {
    let playerHitCards = document.getElementById("playerHit");
    playerHitCards.addEventListener("click", function () {
        enemyTurn = true;
        enemyHit = false;
        enemyAccept = true;
        playerTurn = false;
        playerHit = false;
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// create enemy deack
function EnemyDeckCard() {
    for (let i = 0; i < 6; i++) {
        let newCard = enemyDeck[i];
        cardImg = document.createElement("img");
        cardImg.src = "assets/cardimg/" + newCard + ".png";
        cardImg.id = "enemy-look";
        cardImg.dataset.value = newCard;
        document.getElementById("enemy-cards").append(cardImg);
    }

    //print enemy cards
    console.log("pretinieka kārtis " + enemyDeck);
    console.log("pretinieka karšu daudzums " + enemyDeck.length);
}

//drop enemy card on table
function enemyMoves() {
    enemyCards = document.querySelectorAll("#enemy-look");
    table = document.getElementById("placed-cards");
    tableHit = document.getElementById("hit-cards");
    enemyPrevOnTable = "";
    enemyCardNum = "";
    enemyCardSym = "";
    for (i of enemyCards) {
        i.addEventListener("click", enemyStuff = function enemyFunction() {

            if (enemyTurn === false && enemyHit === true) {
                enemyPrevOnTable = this.dataset.value;

                //parbauda un parveido virkni par ciparu
                enemyCardNum = !isNaN(enemyPrevOnTable.charAt(0)) ? parseInt(enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"))) : enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-"));

                //pievieno vērtības lielākām kārtīm par 10 lai var salīdzīnāt ar cipariem
                if (enemyCardNum === "A") {
                    enemyCardNum = "14";
                } else if (enemyCardNum === "K") {
                    enemyCardNum = "13";
                } else if (enemyCardNum === "Q") {
                    enemyCardNum = "12";
                } else if (enemyCardNum === "J") {
                    enemyCardNum = "11";
                }

                //paņem kārts pēdejo rakszīmi kas ir simbols
                enemyCardSym = enemyPrevOnTable.charAt(enemyPrevOnTable.length - 1);

                //tiek veiktas pārbaudes
                if (enemyCardSym == cardSymbol && playerCardSym == cardSymbol && enemyCardNum > playerCardNum || enemyCardNum > playerCardNum && enemyCardSym == playerCardSym || enemyCardSym == cardSymbol && playerCardSym != cardSymbol) {

                    console.log("uzpieztās kārts " + this.dataset.value);
                    console.log("uzpieztās kārts cipars " + enemyCardNum);
                    console.log("uzpieztās kārts simbols " + enemyCardSym);

                    //parbauda cik kāršu var sist
                    if (cardCountPlayer <= 0) {
                        console.log("Nav vairāk kāršu ko sist");
                    } else {
                        tableHit.append(this);
                        this.id = "none";
                        cardCountPlayer--;

                        cardTable.push(this.dataset.value);
                        console.log("kārtis uz galda " + cardTable);
                        for (let j = 0; j < enemyDeck.length; j++) {
                            if (enemyDeck[j] == this.dataset.value) {
                                enemyDeck.splice(j, 1);
                            }
                        }
                    }
                    if (this.id === "none") {
                        //noņem nost no kārts eventListener
                        this.removeEventListener('click', enemyFunction);
                    }
                } else if (cardCountPlayer > 1) {
                    for (let j = 0; j < cardTable.length; j++) {
                        spiltValues = cardTable[j].split("-");
                        firstValue = spiltValues[0];
                        secondValue = spiltValues[1];
                        for (let j = 0; j < cardTable.length; j++) {
                            if (enemyCardNum > firstValue[j] && enemyCardSym == secondValue[j]) {
                                tableHit.append(this);
                                this.id = "none";
                                cardCountPlayer--;
                                // cardTable.push(this.dataset.value);
                                console.log("kārtis uz galda " + cardTable);
                                for (let j = 0; j < enemyDeck.length; j++) {
                                    if (enemyDeck[j] == this.dataset.value) {
                                        enemyDeck.splice(j, 1);
                                    }
                                }
                                if (this.id === "none") {
                                    this.removeEventListener('click', enemyFunction);
                                }
                            }
                        }
                        console.log(firstValue);
                        console.log(secondValue);
                    }
                } else {
                    console.log("mazāks");
                }
                console.log("pretinieka kārtis tagad " + enemyDeck);
            } else if (enemyTurn === true && enemyHit === false) {

                //parbauda un parveido virkni par ciparu
                enemyCardNum = !isNaN(this.dataset.value.charAt(0)) ? parseInt(this.dataset.value.substring(0, this.dataset.value.search("-"))) : this.dataset.value.substring(0, this.dataset.value.search("-"));

                //pievieno vērtības lielākām kārtīm par 10 lai var salīdzīnāt ar cipariem
                if (enemyCardNum === "A") {
                    enemyCardNum = "14";
                } else if (enemyCardNum === "K") {
                    enemyCardNum = "13";
                } else if (enemyCardNum === "Q") {
                    enemyCardNum = "12";
                } else if (enemyCardNum === "J") {
                    enemyCardNum = "11";
                }

                //tiek veiktas pārbaudes
                for (let j = 0; j < cardTable.length; j++) {
                    spiltValues = cardTable[j].split("-");
                    firstValue = spiltValues[0];
                    secondValue = spiltValues[1];
                    if (enemyCardNum == firstValue[j]) {
                        table.append(this);
                        this.id = "none";
                        for (let j = 0; j < enemyDeck.length; j++) {
                            if (enemyDeck[j] == this.dataset.value) {
                                enemyDeck.splice(j, 1);
                            }
                        }
                        console.log("kārtis uz galda " + cardTable);
                        if (this.id === "none") {
                            this.removeEventListener('click', enemyFunction);
                        }
                    }
                    console.log(firstValue);
                    console.log(secondValue);
                }

                if (enemyPrevOnTable == "" || enemyPrevOnTable.substring(0, enemyPrevOnTable.search("-")) == this.dataset.value.substring(0, this.dataset.value.search("-")) || playerCardNum == enemyCardNum) {

                    //veic skaitīšanu priekš spēlētāja cik kārtis varēs uzlikt
                    cardCountEnemy = cardCountEnemy + 1;
                    console.log("kāršu daudzums ko sist " + cardCountEnemy);

                    for (let j = 0; j < enemyDeck.length; j++) {
                        if (enemyDeck[j] == this.dataset.value) {
                            enemyDeck.splice(j, 1);
                        }
                    }

                    this.id = "none";
                    table.append(this);

                    console.log("uzpieztā kārts " + this.dataset.value);
                    enemyPrevOnTable = this.dataset.value;

                    //paņem kārts pēdejo rakszīmi kas ir simbols
                    enemyCardSym = enemyPrevOnTable.charAt(enemyPrevOnTable.length - 1);

                    console.log("uzpieztās kārts cipars " + enemyCardNum);
                    console.log("uzpieztās kārts simbols " + enemyCardSym);
                    console.log("pretinieka kārtis tagad " + enemyDeck);
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

//enemy pick up
function enemyPickUpCard() {
    lastCard = document.getElementById("maste");
    enemyPickUp = document.getElementById("enemyPickUp");
    enemyTableCard = document.getElementById("enemy-cards");
    playerTableCard = document.getElementById("player-cards");

    enemyPickUp.addEventListener("click", function () {
        if (enemyTurn === false && enemyHit === true) {
            noneCard = document.querySelectorAll("#none");
            for (let i = 0; i < noneCard.length; i++) {
                noneCard[i].addEventListener("click", enemyStuff);
                enemyTableCard.appendChild(noneCard[i]).id = "enemy-look";

                enemyDeck = enemyDeck.concat(cardTable);
                console.log("pretinieka kārtis tagad " + enemyDeck);

                enemyTurn = false;
                enemyHit = false;
                playerTurn = true;
                playerHit = false;

                cardCountPlayer = 0;

                enemyPrevOnTable = "";
                playerPrevOnTable = "";

                //ja kārtis nav palikušas izvada konsolē tikai tekstu
                if (playerDeck.length < 6 && deck.length == 0 && lastCard == null) {
                    console.log("nav vairāk kāršu ko ņemt");

                    //ja ir palikusi pati pēdēja kārts trumpe tad tiek paņemta tikai tā un nomainīta pret simbolu
                } else if (playerDeck.length < 6 && deck.length == 0) {
                    playerDeck = playerDeck.concat(randomCard);
                    lastCard.addEventListener("click", playerStuff);
                    playerTableCard.appendChild(lastCard).id = "card-InHands";
                    lastCard = null;

                    //aizvāc prom kārts muguru un pievieno simbolu
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

                    //ja kārtis ir vienkārši mazāk par 6 tiek pievienotas jaunas
                } else if (playerDeck.length < 6) {
                    for (let i = 0; i < (7 - playerDeck.length); i++) {
                        cardImg = document.createElement("img");
                        card = deck.pop();
                        cardImg.src = "assets/cardimg/" + card + ".png";
                        cardImg.id = "card-InHands";
                        cardImg.dataset.value = card;
                        document.getElementById("player-cards").append(cardImg);
                        cardImg.addEventListener("click", playerStuff);
                        playerDeck.push(card);
                    }
                    console.log("spēlētāja kārtis tagad " + playerDeck);
                } else {
                    console.log("lenght=>6");
                }
            }
        }
    });
}

//end enemyTurn
function enemyTurnEnd() {
    endEnemyTurn = document.getElementById("endEnemyTurn");
    endEnemyTurn.addEventListener("click", function () {
        if (enemyTurn === true && enemyHit === false) {
            enemyTurn = false;
            enemyHit = false;
            playerTurn = false;
            playerHit = true;
            console.log("pretinieka gājiens " + enemyTurn);
        }
    });
}

//enemy hit end
function enemyHitEnd() {
    let enemyHitCards = document.getElementById("enemyHit");
    enemyHitCards.addEventListener("click", function () {
        enemyTurn = false;
        enemyHit = false;
        playerTurn = true;
        playerHit = false;
        playerAccept = true;
    });
}

//enemy accept player hit
function enemyAcceptCards() {
    lastCard = document.getElementById("maste");
    let enemyhittedCards = document.getElementById("enemyHited");
    playerTableCard = document.getElementById("player-cards");
    enemyTableCard = document.getElementById("enemy-cards");
    enemyhittedCards.addEventListener("click", function () {
        if (enemyAccept == true) {
            enemyTurn = false;
            enemyHit = false;
            playerTurn = true;
            playerHit = false;
            while (cardTable.length) {
                cardTable.pop();
            }

            noneCard = document.querySelectorAll("#none");
            hittedCard = document.getElementById("hited");
            for (let i = 0; i < noneCard.length; i++) {
                hittedCard.appendChild(noneCard[i]).id = "card-hited";
            }

            enemyPrevOnTable = "";
            playerPrevOnTable = "";

            //ja kārtis nav palikušas izvada konsolē tikai tekstu
            if (enemyDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

                //ja ir palikusi pati pēdēja kārts trumpe tad tiek paņemta tikai tā un nomainīta pret simbolu
            } else if (enemyDeck.length < 6 && deck.length == 0) {
                enemyDeck = enemyDeck.concat(randomCard);
                lastCard.addEventListener("click", enemyStuff);
                enemyTableCard.appendChild(lastCard).id = "enemy-look";

                //aizvāc prom kārts muguru un pievieno simbolu
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

                //ja kārtis ir vienkārši mazāk par 6 tiek pievienotas jaunas
            } else if (enemyDeck.length < 6) {
                for (let i = 0; i < (7 - enemyDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "enemy-look";
                    cardImg.dataset.value = card;
                    document.getElementById("enemy-cards").append(cardImg);
                    cardImg.addEventListener("click", enemyStuff);
                    enemyDeck.push(card);
                }
                console.log("atjaunotās pretiniekā kārtis " + enemyDeck);
            } else {
                console.log("lenght=>6");
            }

            //ja kārtis nav palikušas izvada konsolē tikai tekstu
            if (playerDeck.length < 6 && deck.length == 0 && lastCard == null) {
                console.log("nav vairāk kāršu ko ņemt");

                //ja ir palikusi pati pēdēja kārts trumpe tad tiek paņemta tikai tā un nomainīta pret simbolu
            } else if (playerDeck.length < 6 && deck.length == 0) {
                playerDeck = playerDeck.concat(randomCard);
                lastCard.addEventListener("click", playerStuff);
                playerTableCard.appendChild(lastCard).id = "card-InHands";

                //aizvāc prom kārts muguru un pievieno simbolu
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

                //ja kārtis ir vienkārši mazāk par 6 tiek pievienotas jaunas
            } else if (playerDeck.length < 6) {
                for (let i = 0; i < (7 - playerDeck.length); i++) {
                    cardImg = document.createElement("img");
                    card = deck.pop();
                    cardImg.src = "assets/cardimg/" + card + ".png";
                    cardImg.id = "card-InHands";
                    cardImg.dataset.value = card;
                    document.getElementById("player-cards").append(cardImg);
                    cardImg.addEventListener("click", playerStuff);
                    playerDeck.push(card);
                }
                console.log("atjaunotas spēlētāja kartis " + playerDeck);
            } else {
                console.log("lenght=>6");
            }
            console.log(deck);
            enemyAccept = false;
        }
    });
}

//GameEnd
function GameEnd() {
    if (playerDeck == 0 && deck.length && 0 && randomCard.length == 0) {
        window.location = "./menu.php";
        alert("game end, player win");
    } else if (enemyDeck == 0 && deck.length && 0 && randomCard.length == 0) {
        window.location = "./menu.php";
        alert("game end, enemy win");
    }
}