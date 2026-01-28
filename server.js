import express from 'express';
import nunjucks from 'nunjucks';
const app = express();
const port = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
  let age = 17;
  let name = 'Hugo';
  let fruits = [
    'Banana',
    'Mango',
    'Apple',
    'Pear',
  ]
  res.render('index.njk', {name, age, fruits});
});

app.get('/about', (req, res) => {
  res.render('about.njk');
});

app.get('/contacts', (req, res) => {
  res.render('contacts.njk');
});

app.get('/form', (req, res) => {
  res.render('form.njk');
});

app.get('/answers', (req, res) => {
  let answers = req.query;
  answers.rizzler = answers.rizzler === 'on' ? true : false;
  answers.age = parseInt(answers.age);
    answers.like = parseInt(answers.like);
  res.render('answers.njk', answers); 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
