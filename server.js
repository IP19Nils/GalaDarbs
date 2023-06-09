const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8080 });

const connectedUsers = {};
let deck = [];
let values = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
let symbol = ["C", "D", "H", "S"];
let playerDeck = [];
let enemyDeck = [];
let card;
let randomCard = [];
let previousNumber = -1;
// funkcija priekš id ģenerēšanas
function generateUserID() {
    return Math.random().toString(36).substr(2, 9);
}

function firstMove() {
    let randomNumber = Math.round(Math.random()); // Generate a random number (either 0 or 1)

    // Check if the generated number is the same as the previous number
    if (randomNumber === previousNumber) {
        // If the generated number is the same as the previous number,
        // invert it (change 0 to 1 or 1 to 0)
        randomNumber = (randomNumber + 1) % 2;
    }

    previousNumber = randomNumber; // Store the current number as the previous number for the next iteration

    return randomNumber;
}

wsServer.on('connection', (ws) => {
    if (deck.length == 0) {
        buildDeck();
        shuffleDeck();
        playerDeckCard();
        enemyDeckCard();
        createMainCard();
    } else {
        let random = playerDeck;
        playerDeck = enemyDeck;
        enemyDeck = random;
    }
    // izveido unikāli id un piešķir to 
    const userID = generateUserID();
    let numbers = firstMove();
    // saglabā lietotāja id objektā
    connectedUsers[ws] = userID;

    ws.on('message', (message) => {
        // apstrādā saņemot ziņojumu no klienta
        console.log('Received message from user', connectedUsers[ws] + ':', JSON.parse(message));

        // Šeit varat veikt jebkuru nepieciešamo apstrādi, piemēram, mijiedarboties ar datu bāzēm vai API, un nosūtīt atbildi atpakaļ klientam, izmantojot WebSocket.
        const response = `Processed: ${message}`;

        wsServer.clients.forEach(client => client.send(JSON.stringify(JSON.parse(message))));
        // nosūta atbildi atpakaļ klientam
        // ws.send(response);
    });

    ws.on('close', () => {
        // apstrādā savienojuma beigšanas ziņojumu
        console.log('WebSocket connection closed for user', connectedUsers[ws]);

        // noņemt lietotāja id no objekta
        delete connectedUsers[ws];
    });
    const users = {
        "type": "userID",
        "data": userID,
        "number": numbers
    }
    ws.send(JSON.stringify(users));

    console.log(deck);
    let decks = {
        "type": "deck",
        "data": deck
    };
    ws.send(JSON.stringify(decks));

    let playerCards = {
        "type": "playerDeck",
        "data": playerDeck
    };
    ws.send(JSON.stringify(playerCards));

    let enemyCards = {
        "type": "enemyDeck",
        "data": enemyDeck
    };
    ws.send(JSON.stringify(enemyCards));

    let randomCards = {
        "type": "mainCard",
        "data": randomCard
    };
    ws.send(JSON.stringify(randomCards));

    // wsServer.clients.forEach(client => client.send("this is send data"));

    console.log('WebSocket connection established for user', userID);
});

//izveido kārtis
function buildDeck() {
    for (let i = 0; i < 4; i++) {
        for (let x = 0; x < 13; x++) {
            deck.push(values[x] + "-" + symbol[i]);
        }
    }
}

//sajauc kārtis
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let x = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[x];
        deck[x] = temp;
    }

    console.log(deck);
}

//izveido spēlētāja kārtis
function playerDeckCard() {
    for (let i = 0; i < 6; i++) {
        card = deck.pop();
        playerDeck.push(card);
    }
}

//izveido pretinieka kārtis
function enemyDeckCard() {
    for (let i = 0; i < 6; i++) {
        card = deck.pop();
        enemyDeck.push(card);
    }
}

//izveido trupju tuzi
function createMainCard() {
    for (let i = 0; i < 1; i++) {
        card = deck.pop();
        randomCard.push(card);
    }
}
