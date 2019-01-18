require("dotenv").config();
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: keys.sql.psd,
    database: "Bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // displayAll();
    // console.log("connection");
});

connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    // console.log('Data received');
    console.table(res);
    search();
});

//product prompt
function search() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What's the id of the project you'd like to buy?",
            choices: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "1":
                    carrotSearch();
                    break;

                case "2":
                    cabbageSearch();
                    break;

                case "3":
                    steakSearch();
                    break;

                case "4":
                    ribsSearch();
                    break;

                case "5":
                    cheeseSearch();
                    break;

                case "6":
                    yogurtSearch();
                    break;

                case "7":
                    oatmealSearch();
                    break;

                case "8":
                    crabSearch();
                    break;

                case "9":
                    sausageSearch();
                    break;

                case "10":
                    pizzaSearch();
                    break;
            }
        });
};

function carrotSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "input",
            message: "What quantity would you like to buy?"
        }).then(function (answer) {
            var query = "SELECT stock_quantity FROM products WHERE id=1";
            let inCart = answer.action;

            connection.query(query, function (err, result, fields) {
                if (err) throw err;

                let quantity = parseInt(result[0].stock_quantity);

                if (inCart > quantity) {
                    console.log("Insufficient quantity!");
                } else {
                    let newQuantity = quantity - inCart;
                    var sql = "UPDATE products SET stock_quantity="+newQuantity+" WHERE id = 1";
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        let productCost;
                        let totalCost;
                        function productCostFinder(){
                            var query = "SELECT price FROM products WHERE id = 1";
                            connection.query(query, function(err, result){
                                if (err) throw err;
                                productCost = result[0].price;
                                totalCost = productCost*inCart;
                                console.log("your total cost is: "+totalCost);
                            });
                        };
                        productCostFinder();
                    });

                };
            });


        });
};
