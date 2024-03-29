const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typesArray = ["coupe", "sedan", "suv", "truck", "wagon"];

const InventorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  },
  type: {
    type: String,
    enum: typesArray
  },
  id: {
    type: String,
    //required: true,
    unique: true
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
