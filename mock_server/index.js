
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

clientConn = []

wss.on('connection', (ws) => {

    clientConn.push(ws)
    console.log("connected to client")
  ws.on('message', (data) => {

    console.log(data)

  });

});

setTimeout(() => { clientConn[0].send("back message") }, 5000);