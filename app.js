const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("login");
});

app.post("/login",function(req,res){
  var data = req.body;
  console.log(data);
  if(2>1){
    res.redirect("/status");
  }
});

app.get("/status", function (req, res) {
  res.render("status");
});

app.get("/profile", function (req, res) {
  res.render("profile");
});

app.get("/requirement", function (req, res) {
  res.render("requirement");
});

app.get("/create", function (req, res) {
  res.render("createaccount");
});

app.post("/create", function (req, res) {
  var data = req.body;
  console.log(data);
  res.redirect("/");
});

app.get("/forgot", function (req, res) {
  res.render("forgotpassword");app.get("/status", function (req, res) {
  res.render("status");
}); 
});

app.post("/forgot", function (req, res) {
  var data = req.body;
  console.log(data);
  res.redirect("/");
});

app.listen(8080, function () {
  console.log(
    "The server is now started\nIgor R. R. Oliveira 180507 -- Rene N. Correa 180886\n"
  );
});

app.get("*", function (req, res) {
  res.render("error");
});
