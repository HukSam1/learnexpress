import express from 'express';
import nunjucks from 'nunjucks';
const app = express();
const port = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
  res.render('index.njk');
});

app.get('/about', (req, res) => {
  res.render('about.njk');
});

app.get('/contacts', (req, res) => {
  res.render('contacts.njk');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
