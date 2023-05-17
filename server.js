const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const hbs = exphbs.create({
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  value: 0
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(require('./routes'));

// process the cookie
app.use(session({
  secret: 'YourSecretKey',
  resave: false,
  saveUninitialized: false
}));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>  console.log(`App listening at http://localhost:${PORT} 🚀`));
});
