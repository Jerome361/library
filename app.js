// Require modules
const express = require('express');
const chalk = require('chalk');
// const debug = require('debug')('app')
const morgan = require('morgan');
const path = require('path');

// windows linebreaks when not in production environment
"rules"; {
  "linebreak-style"; ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]

const app = express();

// Set port 
const port = process.env.PORT;

//Register middleware
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  // res.send('Hello from my Library app')
  // res.sendFile(path.join(__dirname, '/views/index.html'));
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
      title: 'Library'
    }
  );
});

app.listen(port, () => {
//   debug(`Listening on port ${chalk.green(3000)}`)
  console.log(`Listening on port ${chalk.green(port)}`);
});
