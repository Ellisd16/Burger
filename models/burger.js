const orm = require("../config/orm");

const burger = {
    //returns all burgers
    all: function (cb) {
        orm.all("burgers", function (res) {
            cb(res);
        })
    },
    // create a new row
    create: function (cols, vals, cb) {
        orm.create("burgers", cols, vals, function (res) {
            cb(res);
        });
    },
    //update a row
    update: function (objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function (res) {
            cb(res);
        });

    },
    // delete a row
    delete: function (condition, cb) {
        orm.delete("burgers", condition, function (res) {
            cb(res);
        })
    }
};

module.exports = burger