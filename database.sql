DROP TABLE item;
DROP TABLE menu;
DROP TABLE item_order;
DROP TABLE basket;


CREATE TABLE menu (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

CREATE TABLE item (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
price NUMERIC NOT NULL,
menu_id INT NOT NULL,
FOREIGN KEY (menu_id) REFERENCES menu (id)
);

CREATE TABLE basket (
  id SERIAL PRIMARY KEY
);

CREATE TABLE item_order (
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  basket_id INT NOT NULL,
  FOREIGN KEY (basket_id) REFERENCES basket (id)
);


INSERT INTO menu VALUES (1, 'classics')
ALTER SEQUENCE menu_id_seq RESTART WITH 2 INCREMENT BY 1;

INSERT INTO item VALUES (1, 'The Full Monty', 10.95, 1);
INSERT INTO item VALUES (2, 'Butternut Bubble', 9.5, 1);
INSERT INTO item VALUES (3, 'Huevos Rancheros', 10.5, 1);
INSERT INTO item VALUES (4, 'Reggie the Veggie', 10.95, 1);
INSERT INTO item VALUES (5, 'The Breakfast Burrito', 9.5, 1);
INSERT INTO item VALUES (6, 'Chorizo Hash', 9.5, 1);
ALTER SEQUENCE item_id_seq RESTART WITH 7 INCREMENT BY 1;

/*
   1: {
      id: 1,
      name: 'The Full Monty',
      price: 10.95,
      category: 'classics',
      description:
        'Bacon, sausage, black pudding, fried potatoes, mushrooms, beans, tomato, eggs & toast '
    },
    2: {
      id: 2,
      name: 'Butternut bubble',
      price: 9.5,
      category: 'classics',
      description:
        'Butternut squash, potato & spinach bubble with mushrooms,asparagus & avocado hollandaise'
    },
    3: {
      id: 3,
      name: 'Huevos Rancheros',
      price: 10.5,
      category: 'classics',
      description:
        'Fried eggs, tortilla, refried beans, chorizo, salsa, cheddar, sour cream & guacamole '
    },
    4: {
      id: 4,
      name: 'Reggie the Veggie',
      price: 10.95,
      category: 'classics',
      description:
        'Veggie sausage, fried potatoes, egg, mushrooms, tomato, BBQ beans & toast '
    },
    5: {
      id: 5,
      name: 'The Breakfast Burrito',
      price: 9.5,
      category: 'classics',
      description:
        'Chorizo, scrambled egg, peppers, guacamole, sour cream, cheddar, jalapeños & spicy pepper sauce '
    },
    6: {
      id: 6,
      name: 'Chorizo Hash',
      price: 9.5,
      category: 'classics',
      description:
        'Chorizo, peppers, mushrooms, caramelised crushed potatoes & poached egg with a lemon & feta sauce '
    },
    7: {
      id: 7,
      name: 'Avocado, Egg & Chesse',
      price: 5.5,
      category: 'sandwiches',
      description: 'With onions, sun-blushed tomato & sriracha mayo'
    },
    8: {
      id: 8,
      name: 'Bacon, Egg & Cheese',
      price: 5.5,
      category: 'sandwiches',
      description: 'With rocket & Virgin Mary ketchup'
    },
    9: {
      id: 9,
      name: 'Sausage, Egg & Cheese',
      price: 5.5,
      category: 'sandwiches',
      description: 'With red onion chutney'
    },
    10: {
      id: 10,
      name: 'Eggs Benedict',
      price: 9.5,
      category: 'eggs',
      description: 'With ham hock and butternut squash',
      options: ['muffin', 'butternut squash']
    },
    11: {
      id: 11,
      name: 'Eggs Florentine',
      price: 9.5,
      category: 'eggs',
      description: 'With spinach and a muffin',
      extras: ['smoked salmon'],
      extrasPrice: 4
    },
    12: {
      id: 12,
      name: 'The All American',
      price: 11.75,
      category: 'pancakes',
      description:
        'Pancakes, eggs, sausage, bacon, fried potatoes & maple syrup'
    },
    13: {
      id: 13,
      name: 'Beauregarde Pancakes',
      price: 9.5,
      category: 'pancakes',
      description:
        'Gluten free blueberry pancakes, warm blueberry & lemon compote & maple syrup'
    },
    14: {
      id: 14,
      name: 'Oatmilk Porridge',
      price: 3,
      category: 'cereal',
      description: 'Rolled oats, slow-cooked in oat milk',
      extras: [
        'mixed berries',
        'pumpkin seeds',
        'crushed pecans',
        'honey',
        'maple syrup'
      ],
      extrasPrice: 2
    },
    15: {
      id: 15,
      name: 'Huevos Al Joe',
      price: 10.5,
      category: 'eggs',
      description:
        'Poached eggs, peppers, avocado, chillies & hollandaise on English muffin with a choice of fried chicken or chorizo',
      extras: ['fried chicken', 'chorizo'],
      extrasPrice: 0
    }

*/