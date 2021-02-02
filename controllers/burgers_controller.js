
const express = require("express");
const router = express.Router();

//Oh, we got burgers here!
const burger = require("../models/burger.js");




//directs user to homepage
router.get("/", (req, res) => {
    burger.all(function (data) {
        const hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// takes user to list of burgers
router.post("/api/burgers", (req, res) => {
    burger.create(["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        function (result) {
            res.json({ id: result.insertId });
        });
});
//takes user to modifier, then to udpated list 
router.put("/api/burger/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition, function (result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    )
})

module.exports = router;