const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  routeId: { type: String, required: true }, // Use routeId as a string
  busNumber: { type: String, required: true }, // Change from ObjectId to String
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  stops: [
    {
      stopName: { type: String, required: true },
      arrivalTime: { type: Date, required: true },
    },
  ],
  days: [
    {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Schedule', scheduleSchema);
