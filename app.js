const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const questions = [
  {
    question: "Quel module Node.js est utilisé pour créer un serveur web?",
    choices: ["http", "fs", "url"],
    answer: "http"
  },
  {
    question: "Quel est le gestionnaire de packages par défaut pour Node.js?",
    choices: ["npm", "yarn", "bower"],
    answer: "npm"
  },
  {
    question: "Quel mot-clé est utilisé pour importer un module dans Node.js?",
    choices: ["import", "require", "include"],
    answer: "require"
  },
  {
    question: "Quel middleware Express.js est couramment utilisé pour gérer les données des formulaires POST?",
    choices: ["body-parser", "cookie-parser", "session"],
    answer: "body-parser"
  },
  {
    question: "Quelle commande permet d'initialiser un nouveau projet Node.js?",
    choices: ["npm install", "npm start", "npm init"],
    answer: "npm init"
  }
];

app.get('/', (req, res) => {
  res.redirect('/question/0');
});

app.get('/question/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  if (questionId >= 0 && questionId < questions.length) {
    res.render('question', { question: questions[questionId], questionId });
  } else {
    res.send('Fin du questionnaire. Merci pour votre participation!');
  }
});

app.post('/question/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  const userAnswer = req.body.answer;
  
  if (questions[questionId].answer === userAnswer) {
    res.redirect(`/question/${questionId + 1}`);
  } else {
    res.render('question', { question: questions[questionId], questionId, error: "Réponse incorrecte, veuillez réessayer." });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
