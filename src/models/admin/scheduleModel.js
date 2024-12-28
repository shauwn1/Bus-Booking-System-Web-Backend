const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      required: true,
      unique: true, // Ensure scheduleId is unique
    },
    routeId: {
      type: String,
      required: true,
    },
    startPoint: {
      type: String,
      required: true, // Start point for this specific schedule
    },
    endPoint: {
      type: String,
      required: true, // End point for this specific schedule
    },
    busNumber: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Schedule', scheduleSchema);
