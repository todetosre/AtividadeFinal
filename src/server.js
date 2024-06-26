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
      connectedUsers[username] = { ws, score: 0, readyForNewGame: false };
      console.log(`${username} entrou no quiz.`);
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

    if (data.type === 'readyForNewGame') {
      connectedUsers[username].readyForNewGame = true;
      checkAllUsersReadyForNewGame();
    }

    if (data.type === 'restartGame') {
      console.log(`${username} reiniciou o jogo.`);
      // Faça algo para reiniciar o jogo globalmente, mas não recarregue a página dos outros usuários
      broadcastRestart(username);
    }
  });

  ws.on('close', () => {
    if (username) {
      console.log(`${username} saiu do quiz.`);
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
  questionInterval = setInterval(sendQuestionToAllClients, 15000);
}

function sendQuestionToAllClients() {
  const question = getQuestion();
  currentQuestion = question;
  for (const user in connectedUsers) {
    connectedUsers[user].ws.send(JSON.stringify({ type: 'newQuestion', question: question }));
  }
}

function getQuestion() {
  const rawData = fs.readFileSync(path.join(__dirname, './questions.json'));
  const questions = JSON.parse(rawData);
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

function broadcastUserList() {
  const users = Object.keys(connectedUsers).map((username) => {
    return { username: username, score: connectedUsers[username].score };
  });

  for (const user in connectedUsers) {
    connectedUsers[user].ws.send(JSON.stringify({ type: 'updateUserList', users: users }));
  }
}

function endGame() {
  clearInterval(questionInterval);
  gameStarted = false;

  const highestScorer = getHighestScorer();
  for (const user in connectedUsers) {
    connectedUsers[user].ws.send(JSON.stringify({ type: 'endGame', highestScorer: highestScorer }));
  }
}

function getHighestScorer() {
  let highestScore = -1;
  let highestScorer = null;
  for (const user in connectedUsers) {
    if (connectedUsers[user].score > highestScore) {
      highestScore = connectedUsers[user].score;
      highestScorer = user;
    }
  }
  return highestScorer;
}

function checkAllUsersReadyForNewGame() {
  const allReady = Object.values(connectedUsers).every((user) => user.readyForNewGame);
  if (allReady) {
    startGame();
  }
}

function broadcastRestart(username) {
  for (const user in connectedUsers) {
    if (user !== username) {
      connectedUsers[user].ws.send(JSON.stringify({ type: 'newGame' }));
    }
  }
}

server.listen(config.port, () => {
  console.log(`Servidor rodando em http://localhost:${config.port}`);
});
