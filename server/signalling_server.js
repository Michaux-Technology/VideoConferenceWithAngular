const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 },
    () => {
        console.log("Signal server is now Listening on port 8081");
    });

wss.broadcast = (ws, data) => {
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

let connections = 0;

wss.on('connection', ws => {
    console.log('Client connected. Total connected clients: ' + connections++);

    ws.on('message', message => {
        console.log(message + "\n\n");
        wss.broadcast(ws, message);
    });
    ws.on('close', ws => {
        console.log('Client disconnected. Total connected client: ${wss.clients.size}');
    })
    ws.on('error', error => {
        console.log('Client error. Total connected client: ${wss.clients.size}');
    });

});