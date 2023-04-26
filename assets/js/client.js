let ws = new WebSocket("ws://localhost:9090")
ws.onmessage = message => {
    //message data
    const response = JSON.parse(message.data);
    console.log(response);
}
