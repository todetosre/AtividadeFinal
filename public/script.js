const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Conectado ao servidor WebSocket');
  ws.send(JSON.stringify({ type: 'connection', message: 'Cliente conectado!' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Mensagem do servidor: ', data);

  if (data.type === 'welcome') {
    document.getElementById('messages').innerText = data.message;
  }
};

ws.onclose = () => {
  console.log('Desconectado do servidor WebSocket');
};
