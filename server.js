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
  db.any(
    `SELECT item.id, item.name AS name, item.price, menu.name AS menu FROM menu, item`
  )
    .then(menu => res.json(menu))
    .catch(error => {
      res.json(Boom.notFound("Sorry, there's no menu available"));
    });
});

// Get menu items by menu ID

app.get(`/api/menu/:id`, (req, res) => {
  db.many(
    `SELECT item.id, item.name AS name, item.price, menu.name AS menu FROM menu, item WHERE item.menu_id = $1`,
    [req.params.id]
  )
    .then(menu => {
      // const menu = Object.assign({}, { menu_name: data[0].menu }, data);
      res.json(menu);
    })
    .catch(error => res.boom.notFound(`Sorry, that menu is not available`));
});

// Get item by ID

app.get('/api/item/:id', (req, res) => {
  db.one(`SELECT * FROM item WHERE id = $1`, [req.params.id])
    .then(item => res.json(item))
    .catch(error => {
      res.boom.notFound(`Sorry, that item is not available`);
    });
});

// Add user basket

app.post('/api/orders', (req, res) => {
  db.one(`INSERT INTO basket (id) VALUES(DEFAULT) RETURNING id`)
    .then(result => {
      const { items } = req.body;
      const basketId = result.id;
      return Promise.all(
        items.map(item => {
          return db.none(
            `INSERT INTO item_order (item_id, quantity, basket_id)
        VALUES ($1, $2, $3)`,
            [item.id, item.quantity, basketId]
          );
        })
      ).then(() => basketId);
    })
    .then(basketId => res.json({ basketId: basketId }))
    .catch(error =>
      // res.boom.badRequest(`Sorry, we could not process your order`)
      res.json({ error: error.message })
    );
});

app.listen(app.get('port'), () => {
  console.log('Listening on port 8080');
});
