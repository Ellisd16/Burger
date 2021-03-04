const mysql = require("mysql");

let connection;
if (process.env.JAWSBD_URL) {
    connection = mysql.createConnection(process.env.JAWSBD_URL);
} else {
    connection = mysql.createConnection({
        // // host: "127.0.0.1",
        // // port: 3306,
        // host: "localhost",
        // user: "root",
        // password: "gator",
        // database: "burgers_db"
        username: "b2yrgmovvecg3opw",
        pasword: "racz9emyq8u3mjdm",
        database: "pil28yrqjt030gqg",
        host: "pxukqohrckdfo4ty.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        dialect: "mysql"
    });
}
// adding this code to see where my issue is coming from 
var del = connection._protocol._delegateError;
connection._protocol._delegateError = function (err, sequence) {
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
};

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
