const http = require('http');
const app = require('express')();
app.get("/ip19/nils/game/board.php", (req, res) => {
    res.sendFile(__dirname + "nils/game//board.php");
});


app.listen(9091, () => console.log('listening on 9091'));
const webSocketServer = require('websocket').server;
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log('Listening on 9090'));

//hashmap
const clients = {};

const wsServer = new webSocketServer({
    "httpServer": httpServer
});

wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log('Opened!'));
    connection.on("close", () => console.log('closed!'));
    connection.on("message", message => {

        const result = JSON.parse(message.utf8Data);
        //receive message
        console.log(result);

    })
    //generate client id
    const clientID = guid();
    clients[clientID] = {
        "connection": connection
    };

    const payLoad = {
        "method": "connect",
        "clientID": clientID
    }
    //send back the client connect 
    connection.send(JSON.stringify(payLoad));
});

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
