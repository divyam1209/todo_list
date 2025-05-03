const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// In-memory task list
let items = [];
let nextId = 1;

// Home route
app.get("/", function (req, res) {
    res.render("list", { items: items });
});

// Add new task
app.post("/", function (req, res) {
    const itemText = req.body.d1d1;
    if (itemText.trim() !== "") {
        items.push({ id: nextId++, text: itemText.trim() });
    }
    res.redirect("/");
});

// Unified update/delete route
app.post("/action", (req, res) => {
    const action = req.body.action;
    const ids = req.body.item
        ? Array.isArray(req.body.item) ? req.body.item : [req.body.item]
        : [];

    if (action === "delete") {
        items = items.filter(item => !ids.includes(item.id.toString()));
    } else if (action === "update") {
        ids.forEach(id => {
            const newText = req.body[`updated_${id}`];
            const item = items.find(it => it.id.toString() === id);
            if (item && newText.trim() !== "") {
                item.text = newText.trim();
            }
        });
    }

    res.redirect("/");
});

// Start server
app.listen(8000, function () {
    console.log("Server Started on port 8000");
});
