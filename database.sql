-- DROP DATABASE IF EXISTS delivereat;

-- DROP TABLE IF EXISTS item_order CASCADE;
-- DROP TABLE IF EXISTS menu CASCADE;
-- DROP TABLE IF EXISTS item CASCADE;
-- DROP TABLE IF EXISTS basket CASCADE;


CREATE DATABASE delivereat; 

SET TIME ZONE GMT;

CREATE TABLE menu (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

CREATE TABLE item (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description TEXT NOT NULL,
price NUMERIC NOT NULL,
menu_id INT NOT NULL,
FOREIGN KEY (menu_id) REFERENCES menu (id)
);

CREATE TABLE basket (
  id SERIAL PRIMARY KEY,
  received TIMESTAMP NOT NULL
);

CREATE TABLE item_order (
  id SERIAL PRIMARY KEY,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  basket_id INT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES item (id),
  FOREIGN KEY (basket_id) REFERENCES basket (id)
);

INSERT INTO menu VALUES (1, 'classics');
INSERT INTO menu VALUES (2, 'sandwiches');
INSERT INTO menu VALUES (3, 'eggs');
INSERT INTO menu VALUES (4, 'pancakes');
INSERT INTO menu VALUES (5, 'cereal');
ALTER SEQUENCE menu_id_seq RESTART WITH 6 INCREMENT BY 1;

INSERT INTO item VALUES (1, 'The Full Monty', 'Bacon, sausage, black pudding, fried potatoes, mushrooms, beans, tomato, eggs & toast', 10.95, 1);
INSERT INTO item VALUES (2, 'Butternut Bubble', 'Butternut squash, potato & spinach bubble with mushrooms,asparagus & avocado hollandaise',9.5, 1);
INSERT INTO item VALUES (3, 'Huevos Rancheros', 'Fried eggs, tortilla, refried beans, chorizo, salsa, cheddar, sour cream & guacamole', 10.5, 1);
INSERT INTO item VALUES (4, 'Reggie the Veggie', 'Veggie sausage, fried potatoes, egg, mushrooms, tomato, BBQ beans & toast', 10.95, 1);
INSERT INTO item VALUES (5, 'The Breakfast Burrito', 'Chorizo, scrambled egg, peppers, guacamole, sour cream, cheddar, jalapeños & spicy pepper sauce', 9.5, 1);
INSERT INTO item VALUES (6, 'Chorizo Hash', 'Chorizo, peppers, mushrooms, caramelised crushed potatoes & poached egg with a lemon & feta sauce', 9.5, 1);
INSERT INTO item VALUES (7, 'Avocado, Egg & Cheese', 'With onions, sun-blushed tomato & sriracha mayo', 5.5, 2);
INSERT INTO item VALUES (8, 'Bacon & Egg', 'With rocket & Virgin Mary ketchup', 3.5, 2);
INSERT INTO item VALUES (9, 'Sausage, Bacon & Egg', 'With red onion chutney', 5.5, 2);
INSERT INTO item VALUES (10, 'Eggs Benedict', 'With ham hock and butternut squash', 9.5, 3);
INSERT INTO item VALUES (11, 'Eggs Florentine', 'With spinach and a muffin', 9.5, 3);
INSERT INTO item VALUES (12, 'The All American', 'Pancakes, eggs, sausage, bacon, fried potatoes & maple syrup', 11.75, 4);
INSERT INTO item VALUES (13, 'Beauregarde Pancakes', 'Gluten free blueberry pancakes, warm blueberry & lemon compote & maple syrup', 9.5, 4);
INSERT INTO item VALUES (14, 'Oatmilk Porridge', 'Rolled oats, slow-cooked in oat milk', 3, 5);
INSERT INTO item VALUES (15, 'Huevos Al Joe', 'Poached eggs, peppers, avocado, chillies & hollandaise on English muffin with a choice of fried chicken or chorizo', 10.5, 3);
ALTER SEQUENCE item_id_seq RESTART WITH 16 INCREMENT BY 1;