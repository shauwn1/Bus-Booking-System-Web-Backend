// models/admin/routeModel.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    routeId: { type: String, required: true, unique: true },
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    distance: { type: Number, required: true },
    stops: [{ type: String, required: true }], // Array of stop names
    prices: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ], // Array of price information between stops
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Route', routeSchema);
