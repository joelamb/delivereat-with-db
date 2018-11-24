# Tiffany’s
### A database-backed restaurant menu and ordering app.
---
### Technologies
- React
- Node / Express
- Handlebars
- PostgreSQL

### Installation and set-up

- clone the repo and run `npm install` to donwload dependencies.
- create a local PostgreSQL database and initialise it by running the query in `database.sql`.
- add the config variables below to your `.env` file.

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

- run `npm start` to launch and navigate to localhost:8080 to view in your browser.

## Features

### Database Structure

Menu items and orders are stored in four tables.

![database schema]('static/assets/images/deliver-eat-db-schema.png?raw=true')

### RESTful API
`/api/menu` : returns an array of all menu items.  
Example result:
```
[{"id":1,"name":"The Full Monty","price":"10.95","menu":"classics"},   
{"id":9,"name":"Sausage, Bacon & Egg","price":"5.5","menu":"sandwiches"},{"id":10,"name":"Eggs Benedict","price":"9.5","menu":"eggs"},{"id":12,"name":"The All American","price":"11.75","menu":"pancakes"},{"id":13,"name":"Beauregarde Pancakes","price":"9.5","menu":"pancakes"},{"id":14,"name":"Oatmilk Porridge","price":"3","menu":"cereal"}]
```

`/api/menu/:id` : returns and array of menu items by menu id.   
Example result:
```
[{"id":1,"name":"The Full Monty","price":"10.95","menu":"classics"},{"id":2,"name":"Butternut Bubble","price":"9.5","menu":"classics"},{"id":3,"name":"Huevos Rancheros","price":"10.5","menu":"classics"}]
```

`/api/item/:id` : returns and object item.  
Example result:
```
{"id":1,"name":"The Full Monty","description":"Bacon, sausage, black pudding, fried potatoes, mushrooms, beans, tomato, eggs & toast","price":"10.95","menu_id":1}
```

### Unit tests

* TODO: Add unit tests