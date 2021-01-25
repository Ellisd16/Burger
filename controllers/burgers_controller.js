const burger = require("../models/burger");

const router = express.Router();

const express = require("express");

//directs user to homepage
router.get("/", (req, result) => {
    burger.selectAll(function (data) {
        const hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// takes user to list of burgers
router.post("/burgers/create", (req, res) => {
    burger.insertOne(
        req.body, burger_name,
        function () {
            res.redirect("/index")
        });
});
//takes user to modifier, then to udpated list 
router.post("/burger/devoure/:id", () => {
    burger.updateOne(req.params.id, function () {
        res.redirect("/index")
    })
})

module.exports = router;