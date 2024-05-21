const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const config = require('./config.json');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');

  ws.on('message', (message) => {
    console.log('Mensagem recebida: ', message);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
