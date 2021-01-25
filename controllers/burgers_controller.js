
const express = require("express");
const router = express.Router();

const burger = require("../models/burger");


router.get("/", (req, res) => {
    res.redirect("/index")
})

//directs user to homepage
router.get("/index", (req, res) => {
    burger.all(function (data) {
        const hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// takes user to list of burgers
router.post("/burgers/create", (req, res) => {
    burger.create(["burger_name"],
        [req.body.burger_name],
        function (result) {
            res.json({ id: result.insertId });
        });
});
//takes user to modifier, then to udpated list 
router.post("/burger/devour/:id", () => {
    const condition = "id = " + req.params.id;

    burger.update(
        {
            burger_name: req.body.burger_name
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