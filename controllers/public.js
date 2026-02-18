import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
  let age = 17;
  let name = 'Hugo';
  let fruits = [
    'Banana',
    'Mango',
    'Apple',
    'Pear',
  ]
  res.render('index.njk', { name, age, fruits });
});

router.get('/about', (req, res) => {
  res.render('about.njk');
});

router.get('/contacts', (req, res) => {
  res.render('contacts.njk');
});

router.get('/form', (req, res) => {
  res.render('form.njk');
});

router.get('/answers', (req, res) => {
  let answers = req.query;
  answers.rizzler = answers.rizzler === 'on' ? true : false;
  answers.age = parseInt(answers.age);
  answers.like = parseInt(answers.like);
  res.render('answers.njk', answers);
});

router.post('/answers', (req, res) => {
  let answers = req.body;
  answers.rizzler = answers.rizzler === 'on' ? true : false;
  answers.age = parseInt(answers.age);
  answers.like = parseInt(answers.like);
  res.render('answers.njk', answers);
});

export default router;