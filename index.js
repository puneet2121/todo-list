const express = require("express");
const bodyParser = require("body-parser");


const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.URL,{useNewUrlParser: true});

const app = express();
app.set("view engine", "ejs");

// middleware
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

const listSchema = {
  name: String,
  items: [itemsSchema]

}

const List = mongoose.model('List',listSchema);

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


app.get('/:customName', function(req,res) {
  const customName = req.params.customName;
  List.findOne({name: customName}, function(err, foundList){
    if(!err) {
      if (!foundList) {
        const list = new List({
          name: customName,
          items: defaultItems
        });
        list.save();
        res.redirect('/' + customName);
      } else {
        res.render('lists',{title: foundList.name, tango: foundList.items})
      }
    }
  })
  
  
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



app.listen(3000, () => {
  console.log("server listening on 3000");
});
