CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INTEGER(11) PRIMARY KEY NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUE (474060, "Something Cool", "Cool Stuff", 45.92, 15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUE (527490, "Shoes. Gotta have shoes", "Clothing", 50.00, 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUE (363647, "Good Burger (DVD)", "Movies", 24.95, 6);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUE (388391, "Sega Dreamcast", "Video Games", 299.99, 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUE (671495, "Mystery Item", "Miscellaneous", 8000.99, 1);