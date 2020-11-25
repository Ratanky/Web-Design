const express = require("express");
//const lodash = require("lodash");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("login");
})

app.get("/create", function(req,res){
    res.render("createaccount");
});

app.get("/forgot", function(req,res){
    res.render("forgotpassword");
});

app.get("/profile", function(req, res){
    res.render("profile");
});

app.get("/requirement",function(req,res){
    res.render("requirement");
});

app.get("/status",function(req,res){
    res.render("status");
});

app.get("*", function(req, res){
    res.render("error");
});

app.listen(8080, function(){
    console.log("The server is now started\nIgor R. R. Oliveira 180507 -- Rene N. Correa 180886\n");
});