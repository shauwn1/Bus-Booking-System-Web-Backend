const Bus = require('../../models/admin/busModel');
const Schedule = require('../../models/admin/scheduleModel');
const Route = require('../../models/admin/routeModel');
const Booking = require('../../models/commuter/bookingModel');


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
exports.bookSeat = async (req, res) => {
  const {
    busNumber, // Use busNumber directly
    seatNumber,
    passengerName,
    mobileNumber,
    email,
    boardingPlace,
    destinationPlace,
    date,
  } = req.body;

  try {
    // Validate the busNumber
    const bus = await Bus.findOne({ busNumber });
    if (!bus || !bus.isActive) {
      return res.status(404).json({ message: 'Bus is inactive or not found' });
    }

    // Check if the seat is already booked for the specified date
    const existingBooking = await Booking.findOne({
      busNumber, // Match by busNumber
      seatNumber,
      date,
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'Seat already booked' });
    }

    // Create a new booking
    const booking = new Booking({
      busNumber, // Save the busNumber directly
      seatNumber,
      passengerName,
      mobileNumber,
      email,
      boardingPlace,
      destinationPlace,
      date,
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error booking seat:', err.message);
    res.status(500).json({ message: 'Error booking seat', error: err.message });
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
