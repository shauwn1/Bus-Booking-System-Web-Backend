const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    routeId: { type: String, required: true, unique: true }, // Custom route ID (e.g., "A1", "A2")
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    distance: { type: Number, required: true },
    stops: [{ type: String }], // Array of stop names
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Route', routeSchema);
