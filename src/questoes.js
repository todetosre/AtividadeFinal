const fs = require('fs');

//"Randomificador"
function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

//Embaralhador
questions.forEach(question => {
    question.options = shuffleOptions(question.options);
});


fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2), 'utf8');

//Teste
const selectedQuestions = [];
while (selectedQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    if (!selectedQuestions.includes(randomIndex)) {
        selectedQuestions.push(randomIndex);
    }
}

const quizQuestions = selectedQuestions.map(index => questions[index]);

console.log(quizQuestions);

let scores = {};

//Atualiza o placar
function checkAnswer(username, answer) {
    const currentQuestion = quizQuestions.find(q => q.question === answer.question);
    if (currentQuestion && currentQuestion.options.indexOf(answer.answer) === currentQuestion.options.length - 1) {
        scores[username] = (scores[username] || 0) + 10;
    }
}

//Seleção de uma questão aleatória a cada 30 segundos
function selectRandomQuestion() {
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ type: 'newQuestion', question: randomQuestion }));
    });
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quizQuestions.length);
        const randomQuestion = quizQuestions[randomIndex];
 
        wss.clients.forEach(client => {
            client.send(JSON.stringify({ type: 'newQuestion', question: randomQuestion }));
        });
    }, 30000);
}
selectRandomQuestion();