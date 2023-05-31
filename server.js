const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8080 });

// Create an object to store user IDs
const connectedUsers = {};
let deck = [];
let values = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
let symbol = ["C", "D", "H", "S"];
let playerDeck = [];
let enemyDeck = [];
let card;
let randomCard = [];
// Function to generate a unique user ID
function generateUserID() {
    return Math.random().toString(36).substr(2, 9);
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
    // Generate a unique user ID for the connected client
    const userID = generateUserID();

    // Store the user ID in the connectedUsers object
    connectedUsers[ws] = userID;

    ws.on('message', (message) => {
        // Process the received message from the client
        console.log('Received message from user', connectedUsers[ws] + ':', JSON.parse(message));

        // You can perform any necessary processing here, such as interacting with databases or APIs, and send the response back to the client via the WebSocket
        const response = `Processed: ${message}`;

        wsServer.clients.forEach(client => client.send(JSON.stringify(JSON.parse(message))));
        // Send the response back to the client
        // ws.send(response);
    });

    ws.on('close', () => {
        // Handle WebSocket connection close event
        console.log('WebSocket connection closed for user', connectedUsers[ws]);

        // Remove the user ID from the connectedUsers object
        delete connectedUsers[ws];
    });
    const users = {
        "type": "userID",
        "data": userID
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

//create a deck
function buildDeck() {
    for (let i = 0; i < 4; i++) {
        for (let x = 0; x < 13; x++) {
            deck.push(values[x] + "-" + symbol[i]);
        }
    }
}

//shuffle a deck
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let x = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[x];
        deck[x] = temp;
    }

    //print out in console
    console.log(deck);
}

//create player deck
function playerDeckCard() {
    for (let i = 0; i < 6; i++) {
        card = deck.pop();
        playerDeck.push(card);
    }
}

function enemyDeckCard() {
    for (let i = 0; i < 6; i++) {
        card = deck.pop();
        enemyDeck.push(card);
    }
}

function createMainCard() {
    for (let i = 0; i < 1; i++) {
        card = deck.pop();
        randomCard.push(card);
    }
}
