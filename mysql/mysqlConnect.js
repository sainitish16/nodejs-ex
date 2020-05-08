var mysql = require('mysql');

// Connection Mysql
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fkp"
});
  
connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Database [MYSQL] connected..!")
});

module.exports = connection;