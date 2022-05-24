const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "csc317db",
    connectionLimit: 50,
    waitForConnection: true,
    debug: true, //If you have error keep true else leave false

});

const promisePool = pool.promise();
module.exports = promisePool;