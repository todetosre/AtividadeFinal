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

  ws.send(JSON.stringify({ type: 'welcome', message: 'Bem-vindo ao QUIZ DO ZEQUINHA!' }));

  ws.on('message', (message) => {
    const data = message.toString();
    console.log('Mensagem recebida: ', data);
  }); 

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});