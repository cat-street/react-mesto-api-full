require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { login, createUser } = require('./controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// eslint-disable-next-line no-unused-vars
app.use((req, _res, next) => {
  req.user = {
    _id: '5f8f50c9a2c0db4934de758f',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(routes);
// eslint-disable-next-line no-unused-vars
app.all('/*', (_req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порте ${PORT}`);
});
