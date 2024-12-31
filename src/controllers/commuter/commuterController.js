const Bus = require('../../models/admin/busModel');
const Schedule = require('../../models/admin/scheduleModel');
const Route = require('../../models/admin/routeModel');
const Booking = require('../../models/commuter/bookingModel');
const crypto = require('crypto');


exports.searchAvailableBuses = async (req, res) => {
  const { boardingPlace, destinationPlace, date } = req.query;

  try {
    // Validate input
    if (!boardingPlace || !destinationPlace || !date) {
      return res.status(400).json({ message: 'Boarding place, destination place, and date are required' });
    }

    // Find routes that include both boardingPlace and destinationPlace
    const routes = await Route.find();

    const validRoutes = routes.filter((route) => {
      const allStops = [route.startPoint, ...route.stops, route.endPoint];
      const boardingIndex = allStops.indexOf(boardingPlace);
      const destinationIndex = allStops.indexOf(destinationPlace);
      return boardingIndex !== -1 && destinationIndex !== -1 && boardingIndex < destinationIndex;
    });

    if (!validRoutes.length) {
      return res.status(404).json({ message: 'No valid routes found for the provided boarding and destination places' });
    }

    const busesWithPrices = [];

    // Loop through valid routes to find schedules and prices
    for (const route of validRoutes) {
      const priceInfo = route.prices.find(
        (price) => price.from === boardingPlace && price.to === destinationPlace
      );
      if (!priceInfo) {
        continue; // Skip if no price is found
      }

      // Find schedules for the valid route on the specified date
      const schedules = await Schedule.find({
        routeId: route.routeId,
        days: {
          $in: [new Date(date).toLocaleDateString('en-US', { weekday: 'long' })],
        },
      });

      // Populate bus details and add pricing
      for (const schedule of schedules) {
        const bus = await Bus.findOne({ busNumber: schedule.busNumber });
        if (!bus) continue;

        busesWithPrices.push({
          scheduleId: schedule.scheduleId,
          routeId: route.routeId,
          busNumber: schedule.busNumber,
          type: bus.type || 'Unknown',
          capacity: bus.capacity || 0,
          boardingPlace,
          destinationPlace,
          price: priceInfo.price,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          stops: schedule.stops,
        });
      }
    }

    if (!busesWithPrices.length) {
      return res.status(404).json({ message: 'No schedules with price data found for the provided boarding and destination places' });
    }

    res.status(200).json({ buses: busesWithPrices });
  } catch (err) {
    console.error('Error searching available buses:', err.message);
    res.status(500).json({ message: 'Error searching available buses', error: err.message });
  }
};





// Search for Available Buses
exports.searchBuses = async (req, res) => {
  const { departureStation, arrivalStation, date } = req.query;

  try {
    const routes = await Route.find({
      stops: { $all: [departureStation, arrivalStation] },
    });

    const validRouteIds = routes.filter(route => {
      const depIndex = route.stops.indexOf(departureStation);
      const arrIndex = route.stops.indexOf(arrivalStation);
      return depIndex < arrIndex;
    }).map(route => route._id);

    const schedules = await Schedule.find({
      routeId: { $in: validRouteIds },
      date: new Date(date),
    }).populate('busId', 'busNumber type');

    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching buses', error: err.message });
  }
};

// Get Seats for a Bus

exports.getSeats = async (req, res) => {
  const { busNumber, date } = req.query;

  try {
    // Find the bus by busNumber
    const bus = await Bus.findOne({ busNumber });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Get booked seats for the specified bus and date
    const bookings = await Booking.find({ busNumber, date: new Date(date) }); // Ensure `date` matches
    const bookedSeats = bookings.map((booking) => booking.seatNumber);

    // Generate seat availability
    const seats = Array.from({ length: bus.capacity }, (_, i) => ({
      seatNumber: i + 1,
      status: bookedSeats.includes(i + 1) ? 'Booked' : 'Available',
    }));

    // Send the seat availability as the response
    res.status(200).json(seats);
  } catch (err) {
    console.error('Error fetching seats:', err.message);
    res.status(500).json({ message: 'Error fetching seats', error: err.message });
  }
};



// Book a Seat


// Mock Payment Processing
const processPayment = () => {
  // Simulate payment success or failure
  return { success: true, transactionId: crypto.randomBytes(8).toString('hex') };
};

// Mock Payment Refund
const processRefund = (transactionId) => {
  // Simulate refund success
  return { success: true, refundId: crypto.randomBytes(8).toString('hex') };
};

// Book a Seat with Payment
const sendEmail = require('../../utils/sendEmail');

const QRCode = require('qrcode');


exports.bookSeatWithPayment = async (req, res) => {
  const {
    busNumber,
    seatNumber,
    passengerName,
    mobileNumber,
    email,
    boardingPlace,
    destinationPlace,
    date
  } = req.body;

  try {
    // Verify bus details
    const bus = await Bus.findOne({ busNumber });
    if (!bus || !bus.isActive) {
      return res.status(404).json({ message: 'Bus is inactive or not found' });
    }

    // Check if the seat is already booked
    const existingBooking = await Booking.findOne({
      busNumber,
      seatNumber,
      date: new Date(date),
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'Seat already booked' });
    }

    // Find the schedule for the given date
    const schedule = await Schedule.findOne({
      busNumber,
      startTime: { $lte: new Date(date) },
      endTime: { $gte: new Date(date) },
    });

    if (!schedule) {
      return res.status(404).json({ message: 'No schedule found for this bus at the given date and time' });
    }

    // Fetch route details and price
    const route = await Route.findOne({ routeId: schedule.routeId });
    if (!route) {
      return res.status(404).json({ message: 'No route found for this schedule' });
    }

    const priceInfo = route.prices.find(
      (price) => price.from === boardingPlace && price.to === destinationPlace
    );
    if (!priceInfo) {
      return res.status(400).json({ message: 'No price found for the given boarding and destination places' });
    }

    const price = priceInfo.price;

    // Process mock payment
    const paymentResult = processPayment();
    if (!paymentResult.success) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    // Generate a cancellation token
    const cancellationToken = crypto.randomBytes(16).toString('hex');

    // Save the booking in the database
    const booking = new Booking({
      busNumber,
      seatNumber,
      passengerName,
      mobileNumber,
      email,
      boardingPlace,
      destinationPlace,
      date: new Date(date),
      transactionId: paymentResult.transactionId,
      cancellationToken,
    });

    const savedBooking = await booking.save();

    // Generate the QR code
    const bookingDetails = {
      busNumber,
      seatNumber,
      passengerName,
      boardingPlace,
      destinationPlace,
      date: new Date(date).toLocaleString(),
      price,
      transactionId: paymentResult.transactionId,
      cancellationToken,
    };

    // Generate booking details URL
    const bookingDetailsUrl = `https://bus-booking-system-web-backend-production.up.railway.app/api/bookings/${paymentResult.transactionId}`;

    const qrCodeData = await QRCode.toDataURL(JSON.stringify(bookingDetails));

    // Send confirmation email with QR code
    const emailSubject = 'Booking Confirmation';
    const emailMessage = `
      Dear ${passengerName},

      Your booking has been confirmed with the following details:
      - Bus Number: ${busNumber}
      - Seat Number: ${seatNumber}
      - Boarding Place: ${boardingPlace}
      - Destination Place: ${destinationPlace}
      - Date and Time: ${new Date(date).toLocaleString()}
      - Price: ${price}
      - Cancellation Token: ${cancellationToken}

      Please find your QR code below for verification.

      Regards,
      Your Bus Booking Team
    `;

    // Pass the QR code as an attachment
    await sendEmail(email, emailSubject, emailMessage, qrCodeData);

    res.status(201).json({
      message: 'Seat booked successfully',
      booking: { ...savedBooking._doc, price },
      qrCode: qrCodeData, // Include QR code in response for frontend usage
    });
  } catch (err) {
    console.error('Error booking seat:', err.message);
    res.status(500).json({ message: 'Error booking seat', error: err.message });
  }
};








// Cancel Booking
exports.cancelBooking = async (req, res) => {
  const { cancellationToken } = req.body;

  try {
    // Find the booking by cancellation token
    const booking = await Booking.findOne({ cancellationToken });
    if (!booking) {
      return res.status(404).json({ message: 'Invalid cancellation token' });
    }

    // Process mock refund
    const refundResult = processRefund(booking.transactionId);
    if (!refundResult.success) {
      return res.status(400).json({ message: 'Refund failed' });
    }

    // Delete the booking
    await Booking.deleteOne({ _id: booking._id });

    res.status(200).json({
      message: 'Booking canceled and refund processed',
      refundId: refundResult.refundId,
    });
  } catch (err) {
    console.error('Error canceling booking:', err.message);
    res.status(500).json({ message: 'Error canceling booking', error: err.message });
  }
};


// Mock Payment
exports.mockPayment = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const paymentStatus = 'Success'; // Mock payment status
    res.status(200).json({ message: 'Payment processed', paymentStatus });
  } catch (err) {
    res.status(500).json({ message: 'Payment failed', error: err.message });
  }
};
