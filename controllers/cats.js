import express from 'express'
import fs from 'fs';

const router = express.Router();

router.get('', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  res.render('cats/index.njk', { cats });
});

router.get('/create', (req, res) => {
  res.render('cats/create.njk');
});

router.post('', (req, res) => {
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

router.get('/view', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let cat = cats.find(cat => cat.id == req.query.id);
  res.render('cats/view.njk', { cat });
});

router.get('/edit', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let cat = cats.find(cat => cat.id == req.query.id);
  res.render('cats/edit.njk', { cat });
});

router.post('/edit', (req, res) => {
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

router.get('/delete', (req, res) => {
  let data = fs.readFileSync('cats.json', { encoding: 'utf-8' });
  let cats = JSON.parse(data);
  let pos = cats.findIndex(cat => cat.id == req.query.id);
  cats.splice(pos, 1);
  fs.writeFileSync('cats.json', JSON.stringify(cats, null, 2));
  res.redirect('/cats');
});

export default router;