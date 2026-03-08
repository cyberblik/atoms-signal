const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Разрешаем CORS для GitHub Pages
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Создаём PeerJS сервер
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/',
    allow_discovery: true,
    proxied: true
});

app.use('/', peerServer);

// Простой маршрут для проверки
app.get('/', (req, res) => {
    res.send('✅ atoms signal server is running!');
});

// Проверка для PeerJS
app.get('/peerjs', (req, res) => {
    res.json({ status: 'ok', message: 'PeerJS server is alive' });
});

server.listen(port, () => {
    console.log(`✅ Signal server listening on port ${port}`);
});
