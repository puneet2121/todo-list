const express = require("express");
const bodyParser = require("body-parser");


const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const URL = process.env.MONGO_URI.toString()

const port = process.env.PORT;
mongoose.connect(URL ,{useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.set("view engine", "ejs");

// middlewar
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const itemsSchema  = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model('item',itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist",
});

const item2 = new Item({
  name: "Hit the submit button to add an item",
});

const item3 = new Item({
  name: "Hit the checkbox when the task is complete",
});
const defaultItems = [item1, item2, item3];


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


 

app.post("/", (req, res) => {
  let itemName = req.body.t;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect('/')
});

app.post('/delete',(req,res) => {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId,function(err) {
    if(!err) {
      console.log('item deleted successfully');
      res.redirect('/')
    } 
  });
});



app.listen(port, () => {
  console.log("server listening");
});
