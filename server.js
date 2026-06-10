const path = require("path");
const express = require("express");
const session = require("express-session");

const cartRoutes = require("./routes/cart.routes");
const homeRoutes = require("./routes/home.routes");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "car-partz-lab-session",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.get("/", function (req, res) {
    res.redirect("/home");
});

app.get("/index.html", function (req, res) {
    res.redirect("/home");
});

app.use("/home", homeRoutes);
app.use("/cart", cartRoutes);

app.listen(port, function () {
    console.log("Car Partz server running on http://localhost:" + port);
});
