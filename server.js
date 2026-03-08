const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Создаём PeerJS сервер
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/',
    allow_discovery: true,
});

app.use('/', peerServer);

// Простой маршрут для проверки
app.get('/', (req, res) => {
    res.send('✅ atoms signal server is running!');
});

server.listen(port, () => {
    console.log(`Signal server listening on port ${port}`);
});
