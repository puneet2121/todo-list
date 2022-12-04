
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Item from '../models/todo.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const URL = process.env.MONGO_URI


const port = process.env.PORT;
mongoose.connect(URL ,{useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.use(cors());
app.set("view engine", "ejs");

// middlewar
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


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
