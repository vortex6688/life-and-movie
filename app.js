const express = require('express');
const path = require('path');
const User = require("./models/User");
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const helpers = require('handlebars-helpers')();

const app = express();

// Load Keys
const keys = require('./config/keys');
// Connect Our Mongo DB Using Pre-configured keys
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Flash
app.use(connectFlash());

// Connect mongo store for the session
const mongoStore = connectMongo(expressSession);

// Use express session module
app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// Set Global Var to detect if user is authenticated
app.use((req, res,next) => {
  res.locals.user = req.session.userId || null;
  next();
})

// ROUTES
// Load routes
const index = require('./routes/index');
const create = require('./routes/create');
const posts = require('./routes/posts');
const register = require('./routes/auth/register');
const login = require('./routes/auth/login');
const logout = require('./routes/auth/logout');

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// BODY PARSER FOR THE FORM
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



// Use routes
app.use('/', index);
app.use('/create', create);
app.use('/posts', posts);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);

// Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

app.listen(4001, () => {
  console.log("listening on port 3000");
})