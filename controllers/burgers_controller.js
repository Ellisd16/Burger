
const express = require("express");
const router = express.Router();

//Oh, we got burgers here!
const burger = require("../models/burger.js");


router.get("/", (req, res) => {
    res.redirect("/index");
})

//directs user to homepage
router.get("/index", (req, res) => {
    burger.all(function (data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
//create a burger
router.post("/api/burgers", (req, res) => {
    burger.create(
        // ["burger_name", "devoured"],
        // [req.body.burger_name, req.body.devoured]
        // req.body.burger_name
        ["burger_name"], [req.body.burger_name],
        function (result) {
            res.json({ id: result.insertId });

        });
});
//takes user to modifier, then to udpated list 
router.put("/api/burgers/:id", (req, res) => {
    // burger.update(req.params.id, function (result) {
    //     console.log(result); res.sendStatus(200);
    // })
    let condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update(
        { devoured: req.body.devoured },
        condition, function (data) {
            res.redirect("/index");
        }
    )

})

module.exports = router;