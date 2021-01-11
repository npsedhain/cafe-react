const mongoose = require('mongoose');

const MenuItemSchema = mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: false }
});

module.exports = mongoose.model('Item', MenuItemSchema);
