const express = require("express");
const app = express();
const bodyParser = require("body-parser");  //builds te body of a request from a get
const mongoose = require("mongoose");  //set database
const nodemailer = require("nodemailer");  //send emails for users and devs 

//*connect to MongoDB
const dbURI = "mongodb+srv://primary_user:tB90283jFqzuRFTE@web-design.lu6wv.mongodb.net/node-web?retryWrites=true&w=majority"
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then((result) => app.listen(8080, function(){console.log("The server is now started\nIgor R. R. Oliveira 180507 -- Rene N. Correa 180886\n")}))
    .catch((error) => console.log(error));

var login = "email@email.com";
var senha = "123456";
var error = "";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.get("/", function (req, res) {
  res.render("login");
  if(error != ""){
    console.log(error);
    
    error =  "";
  }
});

app.post("/login",function(req,res){
  var data = req.body;
  console.log(data);
  if(data.email == login && data.password == senha){
    res.redirect("/status");
  } else {
    error = "E-mail or password are incorrect";
    res.redirect("/");
  }
});

app.get("/status", function (req, res){
    res.render("status")
});

app.get("/profile", function (req, res) {
  res.render("profile");
});

app.get("/requirement", function (req, res) {
  res.render("requirement");
});

app.get("/create", function (req, res) {
  res.render("createaccount");
  if(error != ""){
    console.log(error);
    
    error =  "";
  }
});

app.post("/create", function (req, res) {
  var data = req.body;
  console.log(data);
  if(data.password!= data.confirmpassword){
    error = "Passwords are different";
    res.redirect("/create");
  } else {
    res.redirect("/");
  }
  
});

app.get("/forgot", function (req, res) {
  res.render("forgotpassword");
});

app.post("/forgot", function (req, res) {
  var data = req.body;
  console.log(data);
  res.redirect("/");
});

app.get("/add_user", function(req,res){

});

app.get("*", function (req, res) {
  res.render("error");
});
