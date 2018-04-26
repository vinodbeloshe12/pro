var mysql = require('mysql');

var connection = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pro',
    multipleStatements: true

});

module.exports = connection;