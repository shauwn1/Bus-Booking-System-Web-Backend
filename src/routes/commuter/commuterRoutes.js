const express = require('express');
const router = express.Router();
const {
  searchBuses,
  getSeats,
  bookSeatWithPayment,
  cancelBooking,
  searchAvailableBuses,
} = require('../../controllers/commuter/commuterController');

// Search for buses
router.get('/buses', searchBuses);

// Get seats for a bus
router.get('/seats', getSeats);

router.get('/available-buses', searchAvailableBuses);

// Book a seat with payment
router.post('/book-with-payment', bookSeatWithPayment);

// Cancel a booking
router.post('/cancel-booking', cancelBooking);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Commuter
 *   description: Commuter operations
 */

/**
 * @swagger
 * /commuters/buses:
 *   get:
 *     summary: Search for available buses
 *     tags: [Commuter]
 *     parameters:
 *       - in: query
 *         name: boardingPlace
 *         schema:
 *           type: string
 *         required: true
 *         description: Boarding place
 *       - in: query
 *         name: destinationPlace
 *         schema:
 *           type: string
 *         required: true
 *         description: Destination place
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Travel date
 *     responses:
 *       200:
 *         description: List of available buses
 *       404:
 *         description: No buses found
 */

/**
 * @swagger
 * /commuters/seats:
 *   get:
 *     summary: Get seat availability
 *     tags: [Commuter]
 *     parameters:
 *       - in: query
 *         name: busNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Bus number
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Travel date
 *     responses:
 *       200:
 *         description: Seat availability
 */
