const express = require('express');
const router = express.Router();
const {
  searchBuses,
  getSeats,
  bookSeat,
  mockPayment,
} = require('../../controllers/commuter/commuterController');

// Search for buses
router.get('/buses', searchBuses);

// Get seats for a bus
router.get('/seats', getSeats);

// Book a seat
router.post('/book', bookSeat);

// Mock payment
router.post('/pay', mockPayment);

module.exports = router;
