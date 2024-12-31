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


router.get('/bookings/:transactionId', async (req, res) => {
  const { transactionId } = req.params;

  try {
    const booking = await Booking.findOne({ transactionId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.error('Error fetching booking details:', err.message);
    res.status(500).json({ message: 'Error fetching booking details', error: err.message });
  }
});

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 buses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       scheduleId:
 *                         type: string
 *                       routeId:
 *                         type: string
 *                       busNumber:
 *                         type: string
 *                       type:
 *                         type: string
 *                       capacity:
 *                         type: integer
 *                       boardingPlace:
 *                         type: string
 *                       destinationPlace:
 *                         type: string
 *                       price:
 *                         type: integer
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                       stops:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             stopName:
 *                               type: string
 *                             arrivalTime:
 *                               type: string
 *                               format: date-time
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   seatNumber:
 *                     type: integer
 *                   status:
 *                     type: string
 *                     enum: [Available, Booked]
 */

/**
 * @swagger
 * /commuters/book-with-payment:
 *   post:
 *     summary: Book a seat with payment
 *     tags: [Commuter]
 *     description: Books a seat for the specified bus and sends a confirmation email with booking details and price to the provided email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *                 description: Bus number to book a seat on
 *                 example: "CCC-7777"
 *               seatNumber:
 *                 type: integer
 *                 description: Seat number to book
 *                 example: 11
 *               passengerName:
 *                 type: string
 *                 description: Name of the passenger
 *                 example: "Abhishek"
 *               mobileNumber:
 *                 type: string
 *                 description: Passenger's mobile number
 *                 example: "0771234567"
 *               email:
 *                 type: string
 *                 description: Passenger's email address for confirmation
 *                 example: "mudiyansew@gmail.com"
 *               boardingPlace:
 *                 type: string
 *                 description: Boarding place of the passenger
 *                 example: "Colombo"
 *               destinationPlace:
 *                 type: string
 *                 description: Destination place of the passenger
 *                 example: "Kandy"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of travel
 *                 example: "2025-02-05T08:30:00Z"
 *     responses:
 *       201:
 *         description: Seat booked successfully, and a confirmation email is sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seat booked successfully, confirmation email sent"
 *                 booking:
 *                   type: object
 *                   properties:
 *                     busNumber:
 *                       type: string
 *                       example: "CCC-7777"
 *                     seatNumber:
 *                       type: integer
 *                       example: 11
 *                     passengerName:
 *                       type: string
 *                       example: "Abhishek"
 *                     mobileNumber:
 *                       type: string
 *                       example: "0771234567"
 *                     email:
 *                       type: string
 *                       example: "mudiyansew@gmail.com"
 *                     boardingPlace:
 *                       type: string
 *                       example: "Colombo"
 *                     destinationPlace:
 *                       type: string
 *                       example: "Kandy"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T08:30:00Z"
 *                     transactionId:
 *                       type: string
 *                       example: "a9029eebdff54ccd"
 *                     cancellationToken:
 *                       type: string
 *                       example: "98b7af26135114a451a4434182a8b115"
 *                     price:
 *                       type: number
 *                       example: 1200
 *       400:
 *         description: Seat already booked, payment failed, or price not found.
 *       404:
 *         description: Bus or schedule not found for the given details.
 *       500:
 *         description: Internal server error.
 */
