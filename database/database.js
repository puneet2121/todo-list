const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.URL,{useNewUrlParser: true});

const itemsSchema  = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model('item',itemsSchema);

//items


module.exports = Item;