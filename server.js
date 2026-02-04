import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
const app = express();
const port = 3000;

app.use(express.urlencoded());

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
  res.render('index.njk', { name, age, fruits });
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

app.post('/answers', (req, res) => {
  let answers = req.body;
  answers.rizzler = answers.rizzler === 'on' ? true : false;
  answers.age = parseInt(answers.age);
  answers.like = parseInt(answers.like);
  res.render('answers.njk', answers);
});




app.get('/cats', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  res.render('cats/index.njk', { cats });
});

app.get('/cats/create', (req, res) => {
  res.render('cats/create.njk');
});

app.post('/cats', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let lastId = cats[cats.length - 1].id;
  let newCat = req.body;
  newCat.id = lastId + 1;
  newCat.birthyear = parseInt(newCat.birthyear);
  newCat.spayed = newCat.spayed === 'on' ? true : false;
  cats.push(newCat);
  fs.writeFileSync('cats.json', JSON.stringify(cats,));
  res.redirect('/cats');
});

app.get('/cats/view', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let cat = cats.find(cat => cat.id == req.query.id);
  res.render('cats/view.njk', { cat });
});

app.get('/cats/edit', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let cat = cats.find(cat => cat.id == req.query.id);
  res.render('cats/edit.njk', { cat });
});

app.post('/cats/edit', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let cat = req.body;
  cat.id = parseInt(req.query.id);
  cat.birthyear = parseInt(cat.birthyear);
  cat.spayed = cat.spayed === 'on' ? true : false;
  let pos = cats.findIndex(cat => cat.id == req.query.id);
  cats.splice(pos, 1, cat);
  fs.writeFileSync('cats.json', JSON.stringify(cats, null, 2));
  res.redirect('/cats');
});

app.get('/cats/delete', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let pos = cats.findIndex(cat => cat.id == req.query.id);
  cats.splice(pos, 1);
  fs.writeFileSync('cats.json', JSON.stringify(cats, null, 2));
  res.redirect('/cats');
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
