const ws = new WebSocket('ws://localhost:3000');
let score = 0;
const username = localStorage.getItem('username') || 'Anônimo';
let timerInterval;

ws.onopen = () => {
  console.log('Conectado ao servidor WebSocket');
  ws.send(JSON.stringify({ type: 'connection', username: username }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Mensagem do servidor: ', data);

  if (data.type === 'newQuestion') {
    resetProgressBar();
    displayQuestion(data.question);
    document.querySelector('.progress-bar').style.display = 'block'; // Mostrar barra de progresso
  }

  if (data.type === 'updateUserList') {
    updateUserList(data.users);
  }

  if (data.type === 'endGame') {
    displayEndGameMessage(data.highestScorer);
  }
};

function displayEndGameMessage(highestScorer) {
  const jogadorDiv = document.querySelector('.jogador');
  jogadorDiv.innerHTML = `<h2>Parabéns, ${highestScorer}!</h2>`;
  jogadorDiv.style.display = 'block';
  document.querySelector('.quiz').style.display = 'none';
  document.querySelector('.progress-bar').style.display = 'none';
}


function updateUserList(users) {
  const placar = document.querySelector('.placar');
  const playerList = document.querySelector('#playerList');
  
  placar.innerHTML = '';
  playerList.innerHTML = '';

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerText = `${user.username}: ${user.score} pontos`;
    placar.appendChild(userElement);
    playerList.appendChild(userElement.cloneNode(true)); // Clone to use same style
  });

  if (users.length < 2) {
    document.querySelector('.quiz').style.display = 'none';
    document.getElementById('waitingMessage').innerText = 'Aguardando mais jogadores...';
    document.querySelector('.progress-bar').style.display = 'none'; // Esconder barra de progresso
  } else {
    document.querySelector('.quiz').style.display = 'block';
    document.getElementById('waitingMessage').innerText = '';
  }
}

ws.onclose = () => {
  console.log('Desconectado do servidor WebSocket');
};

function updateUserList(users) {
  const placar = document.querySelector('.placar');
  const playerList = document.querySelector('#playerList');
  
  placar.innerHTML = '';
  playerList.innerHTML = '';

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerText = `${user.username}: ${user.score} pontos`;
    placar.appendChild(userElement);
  });

  if (users.length < 2) {
    document.querySelector('.quiz').style.display = 'none';
    document.getElementById('waitingMessage').innerText = 'Aguardando mais jogadores...';
  } else {
    document.querySelector('.quiz').style.display = 'block';
    document.getElementById('waitingMessage').innerText = '';
  }
}


function displayQuestion(question) {
  document.querySelector('.question').innerText = question.question;
  const optionsContainer = document.querySelector('.options');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.addEventListener('click', () => checkAnswer(question, option, button));
    optionsContainer.appendChild(button);
  });

  startTimer();
}

function checkAnswer(question, selectedOption, button) {
  const correctAnswer = question.correctOption;

  const buttons = document.querySelectorAll('.options button');
  buttons.forEach(btn => btn.disabled = true);

  if (selectedOption === correctAnswer) {
    button.classList.add('correct');
    score += 10;
  } else {
    button.classList.add('incorrect');
    buttons.forEach(btn => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }

  updateUserScore();

  ws.send(JSON.stringify({ type: 'updateScore', username: username, score: score }));

  if (score >= 100) {
    ws.send(JSON.stringify({ type: 'endGame', highestScorer: username }));
  }
}


function updateUserScore() {
  const userElement = document.querySelector('.placar div');
  userElement.innerText = `${username}: ${score} pontos`;
}

function startTimer() {
  let timeLeft = 30;
  const timerElement = document.querySelector('.progress-bar');
  timerElement.style.width = '100%';
  timerElement.style.backgroundColor = 'green';

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.style.width = `${(timeLeft / 30) * 100}%`;
    if (timeLeft <= 10) {
      timerElement.style.backgroundColor = 'red';
    } else if (timeLeft <= 20) {
      timerElement.style.backgroundColor = 'yellow';
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      ws.send(JSON.stringify({ type: 'nextQuestion' }));
    }
  }, 1000);
}

function resetProgressBar() {
  const timerContainer = document.querySelector('.progress-bar').parentNode;
  const newProgressBar = document.createElement('div');
  newProgressBar.classList.add('progress-bar');

  timerContainer.removeChild(document.querySelector('.progress-bar'));
  timerContainer.appendChild(newProgressBar);
}