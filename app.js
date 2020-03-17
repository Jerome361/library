const express = require('express');
const chalk = require('chalk');
// const debug = require('debug')('app')
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get('/', (req, res) => {
  // res.send('Hello from my Library app')
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(port, () => {
//   debug(`Listening on port ${chalk.green(3000)}`)
  console.log(`Listening on port ${chalk.green(port)}`);
});
