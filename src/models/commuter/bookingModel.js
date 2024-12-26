const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  busNumber: { type: String, required: true }, // Use busNumber as a string
  seatNumber: { type: Number, required: true },
  passengerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String },
  boardingPlace: { type: String, required: true },
  destinationPlace: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
