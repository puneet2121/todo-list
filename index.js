const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
let items = [];
let workList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let today = new Date();

let options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};
let date = today.toLocaleDateString("en-us", options);
app.get("/", (req, res) => {
  res.render("lists", { title: date, tango: items });
});

app.get("/work", (req, res) => {
  res.render("lists", { title: "Work list", tango: workList });
});

app.post("/", (req, res) => {
  let item = req.body.t;
  if ((req.body.btn = "work")) {
    workList.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.post("/work", (req, res) => {
  let item = req.body.t;
  workList.push(item);
  res.redirect("/work");
});
app.listen(3000, () => {
  console.log("server listening on 3000");
});
