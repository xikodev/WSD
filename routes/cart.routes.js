const express = require("express");
const { findProductById } = require("../data/mydata");

const router = express.Router();

function getSessionCart(req) {
    if (!req.session.cart) {
        req.session.cart = {};
    }

    return req.session.cart;
}

function buildCartResponse(req) {
    const cart = getSessionCart(req);
    const items = [];
    let total = 0;

    Object.keys(cart).forEach(function (id) {
        const product = findProductById(id);
        const quantity = cart[id];

        if (!product || quantity <= 0) {
            delete cart[id];
            return;
        }

        items.push({
            product: product,
            quantity: quantity
        });
        total += quantity;
    });

    return {
        items: items,
        total: total
    };
}

router.get("/", function (req, res) {
    res.render("cart", {
        title: "Car Partz"
    });
});

router.get("/add/:id", function (req, res) {
    const product = findProductById(req.params.id);

    if (!product) {
        res.status(404).json({
            error: "Product not found"
        });
        return;
    }

    const cart = getSessionCart(req);
    cart[product.id] = (cart[product.id] || 0) + 1;
    res.json(buildCartResponse(req));
});

router.get("/remove/:id", function (req, res) {
    const product = findProductById(req.params.id);

    if (!product) {
        res.status(404).json({
            error: "Product not found"
        });
        return;
    }

    const cart = getSessionCart(req);
    cart[product.id] = (cart[product.id] || 0) - 1;

    if (cart[product.id] <= 0) {
        delete cart[product.id];
    }

    res.json(buildCartResponse(req));
});

router.get("/getAll", function (req, res) {
    res.json(buildCartResponse(req));
});

module.exports = router;
