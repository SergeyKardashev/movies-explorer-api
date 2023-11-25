const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const appRouter = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

// eslint-disable-next-line no-console
mongoose.connect(DB_URL).then(console.log('MongoDB is connected'));

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.use('/', appRouter);

app.use(errorLogger);
app.use(errorHandler); // my global error handler and sorter for CAUGHT errors

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}, mongoose ${mongoose.version}`);
});
