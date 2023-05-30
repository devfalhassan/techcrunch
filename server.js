const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Handling all bugs that happen in sync code that are not handled anywhere
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log('DB connection successfully');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Handling all bugs that happen in async code that are not handled anywhere (eg wrong DB)
// We need to crash our app becoz the entire node process is in an unclean state
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
