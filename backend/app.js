require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found');
const { requestErrors } = require('./utils/error-messages');

const routes = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://catlogic.students.nomoreparties.co',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

mongoose.connect('mongodb://127.0.0.1:29186/mesto', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(routes);

app.all('/*', () => {
  throw new NotFoundError(requestErrors.notFound.URL_MESSAGE);
});

app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Внутренняя ошибка сервера' : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту: ${PORT}`);
});
