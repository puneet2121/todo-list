import mongoose from "mongoose";

const itemsSchema  = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model('item',itemsSchema);

export default Item;