const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //builds te body of a request from a get
const mongoose = require("mongoose"); //set database
const nodemailer = require("nodemailer"); //send emails for users and devs

//*connect to MongoDB
const dbURI = 
  "mongodb+srv://primary_user:tB90283jFqzuRFTE@web-design.lu6wv.mongodb.net/node-web?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(8080, function () {
      console.log(
        "The server is now started\nIgor R. R. Oliveira 180507 -- Rene N. Correa 180886\n"
      );
    })
  )
  .catch((error) => console.log(error));

const User = require("./models/users");
var logged = "";
var error = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//TODO show msg error to the user
app.get("/", function (req, res) {
  logged = "";
  res.render("login");
  if (error != "") {
    console.log(error);
    
    error = "";
  }
});

app.post("/login", function (req, res) {
  var data = req.body;
  User.findOne({ email: data.email })
    .then((result) => {
      if (result != null && result.password == data.password) {
        console.log(data);
        logged = result;
        res.redirect("/home");
      } else {
        error = "Login incorreto";
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//TODO ejs
app.get("/home", function (req, res) {
  res.render("home", {
    user: logged
  });
  console.log(logged);
  if (error != "") {
    console.log(error);

    error = "";
  }
});

//TODO ejs
app.get("/profile", function (req, res) {
  res.render("profile");
});

//TODO ejs
app.get("/requirement", function (req, res) {
  res.render("requirement");
});

//TODO show msg error to the user
app.get("/create", function (req, res) {
  res.render("createaccount");
  if (error != "") {
    console.log(error);

    error = "";
  }
});

app.post("/create", function (req, res) {
  var data = req.body;
  if (data.password != data.confirmpassword) {
    error = "Passwords are different";
    res.redirect("/create");
  } else {
    User.findOne({ email: data.email })
      .then((result) => {
        if (result == null) {
          const user = new User({
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1) + " " + data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1),
            email: data.email,
            password: data.password,
            role: "newbie",
            requirements: "",
          });
          user
            .save()
            .then((result) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
          res.redirect("/");
        } else {
          console.log("email already registred");
          res.redirect("/create");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get("/forgot", function (req, res) {
  res.render("forgotpassword");
  if (error != "") {
    console.log(error);

    error = "";
  }
});

app.post("/forgot", function (req, res) {
  var data = req.body;
  console.log(data);
  if(data.newpassword == data.confirmpassword){
    User.findOneAndUpdate({ 'email':data.email, 'password':data.oldpassword }, { 'password':data.newpassword }, {new: true}, (error, data) => {
        if(error){
            console.log(error);
        } else {
            console.log(data);
        }
    })
  }
  res.redirect("/");
});

app.get("*", function (req, res) {
  res.render("error");
});
