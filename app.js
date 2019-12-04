var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const handlebars = require("handlebars");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
var fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Using handlebars manually without using render method .html must be used to work with handlebars
/* app.get("/handlebars", (req, res) => {
  fs.readFile(__dirname + "/views/default.html", (err, data) => {
    if (err) throw err;
    var template = handlebars.compile(data.toString());
    res.send(template({ doesWhat: "HELLL" }));
  });
}); */
//using render. .hbs must be used to work with hbs
app.set("view engine", "hbs");
var pages = [
  { path: "model-s", name: "Model-S", range: 300, price: 69 },
  { path: "model-3", name: "Model-3", range: 800, price: 323 },
  { path: "model-x", name: "Model-X", range: 900, price: 769 },
  { path: "mercedes", name: "Mercedes GLA", range: 900, price: 24769 },
  { path: "model-z", name: "Model-Z", range: 1000, price: 769 }
];
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.post("/create", (req, res) => {
  var data = req.body;
  data.name = data.model;
  delete data.model;
  data.path = data.name.replace(" ", "-").toLowerCase();
  pages.push(data);
  res.redirect("/model-s");
});
app.get("/:id", (req, res) => {
  var data = pages.find(entry => entry.path == req.params.id);
  res.render("default", { all: pages, model: data });
});

/* app.use("/", indexRouter);
app.use("/users", usersRouter); */

module.exports = app;
