
const connection = require("../config/connection.js");


function printQuestionMarks(num) {
    let arr = [];

    for (const i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
        const value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            // this will add "" to any data passed in
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    //stringfies the array
    return arr.toString();
}

//Finally creating the ORM

//this will return all the data within the burger array
const orm = {
    all: function (tableInput, cb) {
        const queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    //this will create a new row
    create: function (table, cols, vals, cb) {
        const queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    //this will update an existing one 
    update: function (table, objColVals, condition, cb) {
        const queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // this will delete an existing row
    delete: function (table, condition, cb) {
        const queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};


module.exports = orm;

//I'm not entirely sure the code below works, so I'm gonna comment it out for the mean time 

// const connection = require("./connection");

// const orm = {

//     //these methods will take the user input and insert them into queries, based on whatever they're looking for.    
//     selectAll: function () {
//         const queryString = "SELECT * FROM burger";
//         connection.query(queryString, tableInput, function (err, result) {
//             if (err) throw (err);
//             console.log(result);
//         })

//     },

//     insertOne: function (burgerName) {
//         const queryString = "INSERT INTO burger (id, burger_name, devoured) VALUES (id, ??, FALSE)";
//         connection.query(queryString, burgerName, function (err, result) {
//             if (err) throw (err);
//             console.log(result);
//         })
//     },

//     updateOne: function (burgerName, valOfCol, cb) {
//         const queryString = "UPDATE burger SET burger_name = ??, devoured = TRUE WHERE id = ??";
//         connection.query(queryString, [burgerName, valOfCol], function (err, result) {
//             if (err) throw (err);
//             cb(result);
//         })
//     }
// };

// module.exports = orm; 