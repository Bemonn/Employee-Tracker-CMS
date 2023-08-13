const mysql = require('mysql2');

//Connection settings
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tb19122001',
    database: 'CMS'
});

//Connect to database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
        return;
    }
    console.log("Connected to the database!");
});

//Export connection
module.exports = connection;