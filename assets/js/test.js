const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8080 });

// Create an object to store user IDs
const connectedUsers = {};

// Function to generate a unique user ID
function generateUserID() {
    return Math.random().toString(36).substr(2, 9);
} 

wsServer.on('connection', (ws) => {
    // Generate a unique user ID for the connected client
    const userID = generateUserID();

    // Store the user ID in the connectedUsers object
    connectedUsers[ws] = userID;

    ws.on('message', (message) => {
        // Process the received message from the client
        console.log('Received message from user', connectedUsers[ws] + ':', message);

        // You can perform any necessary processing here, such as interacting with databases or APIs, and send the response back to the client via the WebSocket
        const response = `Processed: ${message}`;

        // wsServer.clients.forEach(client => client.send("datas"));
        // Send the response back to the client
        ws.send(response);
    });

    ws.on('close', () => {
        // Handle WebSocket connection close event
        console.log('WebSocket connection closed for user', connectedUsers[ws]);

        // Remove the user ID from the connectedUsers object
        delete connectedUsers[ws];
    });
    ws.send(userID);
    wsServer.clients.forEach(client => client.send("this is send data"));

    console.log('WebSocket connection established for user', userID);
});
