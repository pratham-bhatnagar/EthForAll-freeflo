const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
  orderPlacedTime: {
    required: true,
    type: Number,
  },
  estimateTimeOfDelivery: {
    required: true,
    type: Number,
  },
  OrderedBy: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
