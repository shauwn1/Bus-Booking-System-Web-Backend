const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  seatNumber: { type: Number, required: true },
  passengerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String },
  boardingPlace: { type: String, required: true },
  destinationPlace: { type: String, required: true },
  date: { type: Date, required: true },
  transactionId: { type: String, required: true }, // Store the transaction ID
  cancellationToken: { type: String, required: true }, // Store the cancellation token
});

module.exports = mongoose.model('Booking', bookingSchema);
