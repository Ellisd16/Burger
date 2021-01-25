const connection = require("./connection");

const orm = {

    //these methods will take the user input and insert them into queries, based on whatever they're looking for.    
    selectAll: function (tableInput) {
        const queryString = "SELECT * FROM ??";
        connection.query(queryString, tableInput, function (err, result) {
            if (err) throw (err);
            console.log(result);
        })

    },

    insertOne: function (tableInput,) {
        const queryString = "INSERT INTO ?? "
    }
}