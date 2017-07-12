var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	start();
});

function start(){
	connection.query("SELECT * FROM products", function(err, res){
		console.log("-----------------");
		for (var i=0; i<res.length; i++){
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price);
		}
		console.log("-----------------");
		inquirer.prompt([
			{
				name: "id_input",
				type: "input",
				message: "Please input the ID number of the product you would like to purchase:",
				validate: function(value){
					if (isNaN(value) === false){
						return true;
					}
					return false;
				}
			},
			{
				name: "quantity",
				type: "input",
				message: "How many would you like to buy?",
				validate: function(value){
					if (isNaN(value) === false){
						return true;
					}
					return false;
				}
			}
		]).then(function(user){
			var product = res.filter(x => x.item_id == user.id_input);
			var stock_quantity = product.map(x => x.stock_quantity)[0];
			if (user.quantity > stock_quantity){
				console.log("-----------------");
				console.log("Insufficient quantity! Try again.");
				console.log("-----------------");
				start();
			} else {
				connection.query("UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: stock_quantity - user.quantity
						},
						{
							item_id: user.id_input
						}
					]
				);
				console.log("-----------------");
				console.log("Thank you for shopping with Bamazon! Your purchase will ship whenever we feel like it!");
				console.log("You bought this: " + product[0].product_name + " x " + user.quantity);
				console.log("Total cost of purchase: $" + (user.quantity*product[0].price));
				console.log("-----------------");
			}
		}).catch(function(e) {
			console.log(e)
		});
	});
}