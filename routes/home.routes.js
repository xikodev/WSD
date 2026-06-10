const express = require("express");
const { getCategories, getProducts } = require("../data/mydata");

const router = express.Router();

router.get("/", function (req, res) {
    res.render("home", {
        title: "Car Partz"
    });
});

router.get("/getCategories", function (req, res) {
    res.json(getCategories());
});

router.get("/getProducts/:id", function (req, res) {
    const products = getProducts(req.params.id);

    if (products.length === 0) {
        res.status(404).json({
            error: "Category not found"
        });
        return;
    }

    res.json(products);
});

module.exports = router;
