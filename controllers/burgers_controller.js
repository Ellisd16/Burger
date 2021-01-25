const burger = require("../models/burger");

const router = express.Router();

const express = require("express");

router.get("/", (req, result) => {
    burger.all(function (data) {

    })
})