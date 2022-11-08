const express = require("express");
const bodyParser = require("body-parser");
const Item = require("./database/database");

const app = express();
app.set("view engine", "ejs");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const item1 = new Item({
  name: "Welcome to your todolist",
});

const itme2 = new Item({
  name: "Hit the submit button to add an item",
});

const item3 = new Item({
  name: "Hit the checkbox when the task is complete",
});

const defaultItems = [item1, itme2, item3];

app.get("/", (req, res) => {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("DB saved");
        }
      });
      res.redirect('/');
    } else {
      res.render("lists", { title: "Today", tango: foundItems });
    }
  });
});

app.get("/work", (req, res) => {
  res.render("lists", { title: "Work list", tango: workList });
});

app.post("/", (req, res) => {
  let itemName = req.body.t;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect('/')
});
app.post("/work", (req, res) => {
  let item = req.body.t;
  workList.push(item);
  res.redirect("/work");
});
app.listen(3000, () => {
  console.log("server listening on 3000");
});
