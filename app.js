// Require modules
const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser')
// const debug = require('debug')('app')
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session')

// // windows linebreaks when not in production environment
// "rules" = {
//   "linebreak-style" : ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
// } 

const app = express();

// Set port
const port = process.env.PORT;

//Register middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({secret: 'library'}))
require('./src/config/passport.js')(app)

app.use(express.static(path.join(__dirname, '/public/')));
app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js'))
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist'))
);
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoute')(nav);
const authRouter = require('./src/routes/authRouter')(nav)

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  // res.send('Hello from my Library app')
  // res.sendFile(path.join(__dirname, '/views/index.html'));
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Library',
  });
});

app.listen(port, () => {
  //   debug(`Listening on port ${chalk.green(3000)}`)
  console.log(`Listening on port ${chalk.green(port)}`);
});
