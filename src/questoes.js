const fs = require('fs');

// Array de questões com suas alternativas
const questions = [
    {
        question: "Qual é a capital da França?",
        options: ["Londres", "Berlim", "Madri", "Roma", "Lisboa", "Paris"],
        correctOption: "Paris"
    },
    {
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "Brasília", "São Paulo", "Belo Horizonte", "Salvador", "Ivinhema"],
        correctOption: "Brasília"
    },
    {
        question: "Qual é a capital do Canadá?",
        options: ["Ottawa", "Toronto", "Vancouver", "Montreal", "Calgary", "Hamilton"],
        correctOption: "Ottawa"
    },
    {
        question: "Qual é o elemento químico mais abundante na crosta terrestre?",
        options: ["Oxigênio", "Silício", "Ferro", "Alumínio", "Cálcio", "Magnésio"],
        correctOption: "Oxigênio"
    },
    {
        question: "Qual é o maior rio do mundo em volume de água?",
        options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtze", "Rio Mississippi", "Rio Ganges", "Rio Atântico"],
        correctOption: "Rio Amazonas"
    },
    {
        question: "Quem pintou a famosa obra 'Mona Lisa'?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo", "Claude Monet", "Leonardo diCaprio"],
        correctOption: "Leonardo da Vinci"
    },
    {
        question: "Qual é o esporte mais popular do mundo em termos de número de espectadores?",
        options: ["Futebol", "Basquetebol", "Críquete", "Tênis", "Golfe", "Baseboll"],
        correctOption: "Futebol"
    },
    {
        question: "Qual é a empresa fundada por Elon Musk que fabrica carros elétricos?",
        options: ["Tesla", "SpaceX", "Amazon", "Google", "Apple", "Facebook"],
        correctOption: "Tesla"
    },
    {
        question: "Qual é a maior lua de Saturno?",
        options: ["Titã", "Mimas", "Encélado", "Io", "Europa", "Terra"],
        correctOption: "Titã"
    },
    {
        question: "Em que ano a Segunda Guerra Mundial começou?",
        options: ["1939", "1941", "1945", "1942", "1937", "1957"],
        correctOption: "1939"
    },
    {
        question: "Quantos jogadores compõem uma equipe de vôlei em quadra?",
        options: ["6", "7", "5", "8", "4", "1"],
        correctOption: "6"
    },
    {
        question: "Qual é o sistema operacional desenvolvido pela Apple para seus dispositivos móveis?",
        options: ["iOS", "Android", "Windows Phone", "BlackBerry OS", "Symbian", "Linux"],
        correctOption: "iOS"
    },
    {
        question: "Qual é a sigla para a tecnologia de comunicação sem fio de curto alcance que permite a troca de dados entre dispositivos próximos?",
        options: ["NFC", "GPS", "USB", "LTE", "HTML", "Bluetooth"],
        correctOption: "Bluetooth"
    },
    {
        question: "Qual empresa desenvolveu o sistema operacional Android?",
        options: ["Apple", "Microsoft", "Google", "Samsung", "Sony", "Amazon"],
        correctOption: "Google"
    },
    {
        question: "O que significa a sigla 'URL'?",
        options: ["Universal Resource Locator", "Uniform Resource Locator", "Universal Remote Link", "Unified Resource Locator", "Uniform Remote Link", "Uniform Recovery Locator"],
        correctOption: "Uniform Resource Locator"
    },
    {
        question: "Qual foi o primeiro computador pessoal comercialmente bem-sucedido?",
        options: ["IBM PC", "Commodore PET", "Apple II", "Altair 8800", "TRS-80", "Apple IV"],
        correctOption: "Apple II"
    },
    {
        question: "O que significa a sigla 'HTML'?",
        options: ["Hyperlink Text Markup Language", "Hyperlink Transfer Markup Language", "Hypertext Transfer Mode Language", "Hypertext Markup Language", "Hyperlink Markup Language", "Hypertext Mockup Language"],
        correctOption: "Hypertext Markup Language"
    },
    {
        question: "Quem foi o co-fundador da Microsoft junto com Bill Gates?",
        options: ["Steve Jobs", "Steve Wozniak", "Paul Allen", "Larry Page", "Elon Musk", "Paul Walker"],
        correctOption: "Paul Allen"
    },
    {
        question: "Qual é o termo utilizado para descrever um software malicioso projetado para danificar ou controlar computadores sem o consentimento do usuário?",
        options: ["Spyware", "Malware", "Adware", "Phishing", "Firewall", "Vírus"],
        correctOption: "Malware"
    },
    {
        question: "Qual é o nome do fundador e CEO do Facebook?",
        options: ["Jeff Bezos", "Mark Zuckerberg", "Tim Cook", "Satya Nadella", "Jack Dorsey", "Mark Ruffalo"],
        correctOption: "Mark Zuckerberg"
    },
    {
        question: "Qual é o nome do encanador italiano da Nintendo, que é o personagem principal de uma das franquias mais populares de videogame?",
        options: ["Sonic", "Crash Bandicoot", "Link", "Mario", "Master Chief", "Chan"],
        correctOption: "Mario"
    },
    {
        question: "Qual é o nome do jogo que se passa em um mundo aberto onde os jogadores podem explorar, construir estruturas e enfrentar monstros à noite?",
        options: ["Minecraft", "Fortnite", "The Legend of Zelda", "World of Warcraft", "Terraria", "Legonite"],
        correctOption: "Minecraft"
    },
    {
        question: "Qual é o nome da franquia de jogos de tiro em primeira pessoa que apresenta um soldado conhecido como 'Doom Slayer'?",
        options: ["Call of Duty", "Halo", "Battlefield", "Doom", "Counter-Strike", "World of Warcraft"],
        correctOption: "Doom"
    },
    {
        question: "Qual é o nome do estúdio de desenvolvimento de jogos responsável pela série 'The Witcher' e 'Cyberpunk 2077'?",
        options: ["Bethesda Game Studios", "Ubisoft", "Rockstar Games", "CD Projekt Red", "Naughty Dog", "Bethesda"], 
        correctOption: "CD Projekt Red"
    },
    {
        question: "Qual é o nome do jogo de estratégia em tempo real da Blizzard Entertainment, que é um dos mais populares e influentes do gênero?",
        options: ["Age of Empires", "Command & Conquer", "StarCraft", "Warcraft", "Total War", "StarField"],
        correctOption: "StarCraft"
    },
    {
        question: "Qual é o nome do jogo de plataforma lançado pela Nintendo em 1985, que é um dos jogos mais vendidos e influentes de todos os tempos?",
        options: ["Super Mario Bros", "Donkey Kong", "Pac-Man", "Tetris", "The Legend of Zelda", "Super Mario Cart"],
        correctOption: "Super Mario Bros"
    },
    {
        question: "Qual é o nome do jogo de RPG da Square Enix que apresenta uma história épica sobre a luta entre a luz e a escuridão, com personagens como Cloud Strife e Sephiroth?",
        options: ["Final Fantasy VII", "Kingdom Hearts", "Dark Souls", "The Elder Scrolls V: Skyrim", "Persona 5", "Final Fantasy XV"],
        correctOption: "Final Fantasy VII"
    },
    {
        question: "Qual é o nome do jogo de battle royale desenvolvido pela Epic Games, que se tornou um fenômeno cultural com milhões de jogadores em todo o mundo?",
        options: ["PUBG", "Fortnite", "Apex Legends", "Call of Duty: Warzone", "Free Fire", "Minecraft"],
        correctOption: "Fortnite"
    },
    {
        question: "Qual é o nome da série de jogos de ação-aventura da Naughty Dog que apresenta os personagens Nathan Drake e Ellie?",
        options: ["Uncharted", "The Last of Us", "God of War", "Horizon Zero Dawn", "Spider-Man", "FarCry"],
        correctOption: "Uncharted"
    },
    {
        question: "Qual é o nome do jogo de simulação de vida desenvolvido pela Maxis e publicado pela Electronic Arts, onde os jogadores controlam a vida virtual de personagens chamados 'Sims'?",
        options: ["Animal Crossing", "Stardew Valley", "The Sims", "Harvest Moon", "SimCity", "Clash of Clans"],
        correctOption: "The Sims"
    },
    {
        question: "Qual é o nome do estúdio responsável pelo desenvolvimento da série de jogos 'The Elder Scrolls'?",
        options: ["Bethesda Game Studios", "BioWare", "Bungie", "Square Enix", "Capcom", "Naughty Dog"],
        correctOption: "Bethesda Game Studios"
    },
    {
        question: "Qual é o nome do protagonista da série de jogos 'Uncharted', desenvolvida pela Naughty Dog?",
        options: ["Nathan Drake", "Sam Fisher", "Solid Snake", "John Marston", "Joel", "Cloe"],
        correctOption: "Nathan Drake"
    },
    {
        question: "Qual é o nome do estúdio que desenvolveu o jogo 'The Last of Us'?",
        options: ["Naughty Dog", "Santa Monica Studio", "Sucker Punch Productions", "Guerrilla Games", "Media Molecule", "Epic Games"],
        correctOption: "Naughty Dog"
    },
    {
        question: "Em qual cidade fictícia se passa o jogo 'GTA: San Andreas'?",
        options: ["Los Santos", "Liberty City", "Vice City", "San Fierro", "Las Venturas", "Las Venturas"],
        correctOption: "Los Santos"
    },
    {
        question: "Qual é o nome do personagem principal da série de jogos 'God of War'?",
        options: ["Kratos", "Ares", "Zeus", "Hades", "Poseidon", "Klaiton"],
        correctOption: "Kratos"
    },
    {
        question: "Qual é o nome do estúdio que desenvolveu o jogo 'Red Dead Redemption 2'?",
        options: ["Rockstar Games", "Ubisoft", "BioWare", "CD Projekt Red", "Epic Games", "Riot Games"],
        correctOption: "Rockstar Games"
    },
    {
        question: "Qual é o nome do planeta natal do personagem Master Chief da série 'Halo'?",
        options: ["Reach", "Sanghelios", "Zeta Halo", "Installation 04", "Earth", "Litch"],
        correctOption: "Reach"
    },
    {
        question: "Qual é o nome do estúdio que desenvolveu o jogo 'Cyberpunk 2077'?",
        options: ["CD Projekt Red", "Bethesda Game Studios", "Naughty Dog", "Rockstar Games", "Square Enix", "CD Projekt Yellow"],
        correctOption: "CD Projekt Red"
    },
    {
        question: "Qual é o nome do vilão principal da série de jogos 'The Legend of Zelda'?",
        options: ["Ganon", "Vaati", "Zant", "Demise", "Yuga", "Gengo"],
        correctOption: "Ganon"
    },
    {
        question: "Qual é o nome do personagem que é o protagonista da série de jogos 'Persona'?",
        options: ["Joker", "Ryuji Sakamoto", "Makoto Niijima", "Yusuke Kitagawa", "Futaba Sakura", "Thresh"],
        correctOption: "Joker"
    },
    {
        question: "Qual é o nome do jogo que popularizou o gênero battle royale e foi desenvolvido pelo estúdio Epic Games?",
        options: ["Fortnite", "Apex Legends", "PUBG", "Call of Duty: Warzone", "Valorant", "World of Warcraft"], // A resposta correta é a primeira opção
        correctOption: "Fortnite"
    },
    {
        question: "Em qual jogo da franquia 'Super Smash Bros.' o personagem Sonic the Hedgehog faz sua estreia como personagem jogável?",
        options: ["Super Smash Bros. Brawl", "Super Smash Bros. Melee", "Super Smash Bros. for Nintendo 3DS and Wii U", "Super Smash Bros. Ultimate", "Super Smash Bros.", "Super Mario Cart"],
        correctOption: "Super Smash Bros. Brawl"
    },
    {
        question: "Qual é o nome do protagonista do jogo 'Half-Life'?",
        options: ["Gordon Freeman", "Alyx Vance", "Barney Calhoun", "Eli Vance", "Dr. Isaac Kleiner", "Morgan Freeman"],
        correctOption: "Gordon Freeman"
    },
    {
        question: "Qual é o nome do estúdio responsável pelo desenvolvimento da série de jogos 'Dark Souls'?",
        options: ["FromSoftware", "Capcom", "Square Enix", "Bethesda Game Studios", "Naughty Dog", "Blizzard"],
        correctOption: "FromSoftware"
    },
    {
        question: "Qual é o nome do estúdio que desenvolveu o jogo 'The Witcher 3: Wild Hunt'?",
        options: ["CD Projekt Red", "Naughty Dog", "Rockstar Games", "Ubisoft", "Square Enix", "Blizzard"],
        correctOption: "CD Projekt Red"
    },
    {
        question: "Qual é o nome do protagonista do jogo 'The Legend of Zelda: Breath of the Wild'?",
        options: ["Link", "Zelda", "Ganondorf", "Impa", "Mipha", "Kratos"],
        correctOption: "Link"
    },
    {
        question: "Em que ano foi lançado o jogo 'Super Mario Bros.' para o console Nintendo Entertainment System (NES)?",
        options: ["1985", "1983", "1987", "1989", "1991", "2024"],
        correctOption: "1985"
    },
    {
        question: "Qual é o nome do protagonista da série de jogos 'Final Fantasy VII'?",
        options: ["Cloud Strife", "Squall Leonhart", "Tidus", "Zidane Tribal", "Noctis Lucis Caelum", "Steve"],
        correctOption: "Cloud Strife"
    },
    {
        question: "Qual é o nome do campeonato mundial anual de League of Legends organizado pela Riot Games?",
        options: ["League of Legends (Worlds)", "League of Legends (LCS)", "League of Legends (LCK)", "League of Legends (LPL)", "League of Legends (MSI)", "League of Legends (CBLOL)"],
        correctOption: "League of Legends World Championship (Worlds)"
    },
    {
        question: "Qual é o nome da região fictícia em que se passa a maior parte do lore de League of Legends?",
        options: ["Runeterra", "Noxus", "Demacia", "Ionia", "Piltover", "ShadowLands"],
        correctOption: "Runeterra"
    }
];

// Função para embaralhar as opções de forma aleatória
function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

// Embaralhar as opções de todas as questões
questions.forEach(question => {
    question.options = shuffleOptions(question.options);
});

// Gerar o arquivo JSON com as questões
fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2), 'utf8');

// Selecionar aleatoriamente 10 questões para o quiz
const selectedQuestions = [];
while (selectedQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    if (!selectedQuestions.includes(randomIndex)) {
        selectedQuestions.push(randomIndex);
    }
}

// Salvar as 10 questões selecionadas em um novo array
const quizQuestions = selectedQuestions.map(index => questions[index]);

// Exibir as 10 questões selecionadas
console.log(quizQuestions);


// Adicione esta parte ao final do arquivo questpes.js
let scores = {}; // Armazenar pontuações dos usuários

// Função para verificar e atualizar a pontuação do usuário
function checkAnswer(username, answer) {
    const currentQuestion = quizQuestions.find(q => q.question === answer.question);
    if (currentQuestion && currentQuestion.options.indexOf(answer.answer) === currentQuestion.options.length - 1) {
        scores[username] = (scores[username] || 0) + 10;
    }
}

// Função para selecionar uma questão aleatória a cada 30 segundos
function selectRandomQuestion() {
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ type: 'newQuestion', question: randomQuestion }));
    });
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quizQuestions.length);
        const randomQuestion = quizQuestions[randomIndex];
        // Enviar a questão aleatória para os clientes conectados
        wss.clients.forEach(client => {
            client.send(JSON.stringify({ type: 'newQuestion', question: randomQuestion }));
        });
    }, 30000); // 30 segundos
}

// Chamar a função para selecionar uma questão aleatória
selectRandomQuestion();