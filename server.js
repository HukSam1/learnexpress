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

import publicRoutes from './controllers/public.js';
app.use(publicRoutes);

import cats from './controllers/cats.js';
app.use('/cats', cats);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
