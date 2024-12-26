const mongoose = require('mongoose');

const permitSchema = new mongoose.Schema({
  permitNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busNumber: {
    type: String,
    required: true,
  },
  routeId: {
    type: String,
    required: true,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validTo: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Permit', permitSchema);
