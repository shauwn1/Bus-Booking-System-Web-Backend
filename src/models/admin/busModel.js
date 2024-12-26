const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['Luxury', 'Semi-Luxury', 'Normal'],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  operatorId: {
    type: String, // Change from ObjectId to String
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Bus', busSchema);
