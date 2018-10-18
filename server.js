require('dotenv').config();

const pgp = require('pg-promise')();
const boom = require('express-boom');
const express = require('express');
const app = express();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(boom());
app.set('port', process.env.PORT || 8080);
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

// Call index to load all external resources from /static/
app.get('/', (req, res) => {
  res.render('index');
});

// Get all menu items

app.get('/api/menu', (req, res) => {
  db.any(`SELECT * FROM item`)
    .then(menu => res.json(menu))
    .catch(error => {
      res.json(Boom.notFound("Sorry, there's no menu available"));
    });
});

// Get menu items by menu ID

app.get(`/api/menu/:id`, (req, res) => {
  db.many(`SELECT * FROM item WHERE menu_id = $1`, [req.params.id])
    .then(menu => res.json(menu))
    .catch(
      error => res.boom.notFound(`Sorry, that menu is not available`)
      // res.json(Boom.notFound(`Sorry, that item is not available`))
    );
});

app.listen(app.get('port'), () => {
  console.log('Listening on port 8080');
});
