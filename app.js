const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://user1:senha123@webdesign.fgics.mongodb.net/nodedb?retryWrites=true&w=majority", {
//   useNewUrlParser: true
// }, function(error){
//   if(error){
//     console.log(error);
//   } else {
//     console.log("Connected to database");
//   }
// });

// var profileSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   Age: Number,
//   dateRegistration: Date
//   role: String
// });
// var Profile = mongoose.model("Profile", profileSchema);

var login = "email@email.com";
var senha = "123456";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.get("/", function (req, res) {
  res.render("login");
});

app.post("/login",function(req,res){
  var data = req.body;
  console.log(data);
  if(data.email == login && data.password == senha){
    res.redirect("/status");
  } else {
    console.log("Login error.");
    res.redirect("/");
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
  if(data.password1 != data.password2){
    console.log("Different passwords");
    res.redirect("create");
  } else {
    res.redirect("/");
  }
  
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
