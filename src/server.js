const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const config = require('./config.json');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/entrada.html'));
});

let connectedUsers = {};
let currentQuestion = null;
let gameStarted = false;
let questionInterval;

wss.on('connection', (ws) => {
  let username = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'connection') {
      username = data.username;
      connectedUsers[username] = { ws, score: 0 };
      console.log(`${username} entrou no quiz.`);  // Loga a entrada do jogador
      broadcastUserList();

      if (Object.keys(connectedUsers).length >= 2 && !gameStarted) {
        gameStarted = true;
        startGame();
      }
    }

    if (data.type === 'nextQuestion') {
      sendQuestionToAllClients();
    }

    if (data.type === 'updateScore') {
      connectedUsers[username].score = data.score;
      broadcastUserList();
    }

    if (data.type === 'endGame') {
      endGame();
    }
  });

  ws.on('close', () => {
    if (username) {
      console.log(`${username} saiu do quiz.`);  // Loga a saída do jogador
      delete connectedUsers[username];
      broadcastUserList();
      if (Object.keys(connectedUsers).length < 2 && gameStarted) {
        endGame();
      }
    }
  });
});

function startGame() {
  sendQuestionToAllClients();
  questionInterval = setInterval(sendQuestionToAllClients, 30000); // 30 segundos por pergunta
}

function sendQuestionToAllClients() {
  shuffle(questions);
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  const message = JSON.stringify({ type: 'newQuestion', question: currentQuestion });
  for (const user in connectedUsers) {
    connectedUsers[user].ws.send(message);
  }
}

function endGame() {
  const highestScorer = Object.keys(connectedUsers).reduce((max, user) => {
    return connectedUsers[user].score > connectedUsers[max].score ? user : max;
  }, Object.keys(connectedUsers)[0]);

  const endGameMessage = JSON.stringify({ type: 'endGame', highestScorer: highestScorer });
  for (const user in connectedUsers) {
    connectedUsers[user].ws.send(endGameMessage);
  }
  console.log(`${highestScorer} venceu o quiz!`);  // Loga o vencedor do jogo
  clearInterval(questionInterval);
  resetGame();
}

function resetGame() {
  gameStarted = false;
  currentQuestion = null;
  for (const user in connectedUsers) {
    connectedUsers[user].score = 0;
  }
  broadcastUserList();
}

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function broadcastUserList() {
  const userList = Object.keys(connectedUsers).map(username => ({
    username,
    score: connectedUsers[username].score
  }));
  const message = JSON.stringify({ type: 'updateUserList', users: userList });
  for (const user in connectedUsers) {
    connectedUsers[user].ws.send(message);
  }
}

server.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
