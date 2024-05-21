const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Conectado ao servidor WebSocket');
};

ws.onmessage = (event) => {
  console.log('Mensagem do servidor: ', event.data);
};

ws.onclose = () => {
  console.log('Desconectado do servidor WebSocket');
};
