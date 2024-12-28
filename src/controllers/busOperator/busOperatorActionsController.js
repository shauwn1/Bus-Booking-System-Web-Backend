const Schedule = require('../../models/admin/scheduleModel');
const Bus = require('../../models/admin/busModel');
const Booking = require('../../models/commuter/bookingModel');

// View schedules for operator's buses
exports.getSchedulesForOperator = async (req, res) => {
    try {
      const operatorId = req.user.operatorId; // Get operatorId from token
      const { date } = req.query; // Extract date from query parameters
  
      // Find buses associated with the operator
      const buses = await Bus.find({ operatorId });
      if (!buses.length) {
        return res.status(404).json({ message: 'No buses found for this operator' });
      }
  
      const busNumbers = buses.map((bus) => bus.busNumber);
  
      // Build the query object
      const query = { busNumber: { $in: busNumbers } };
      if (date) {
        // Filter schedules by date if provided
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        query.startTime = { $gte: startOfDay, $lte: endOfDay };
      }
  
      // Find schedules and sort by startTime
      const schedules = await Schedule.find(query)
        .populate('routeId', 'routeId startPoint endPoint distance') // Populate route details
        .select('-_id -__v') // Exclude MongoDB-specific fields
        .sort({ startTime: 1 }); // Sort schedules by time
  
      if (!schedules.length) {
        return res.status(404).json({ message: 'No schedules found for this operator' });
      }
  
      res.status(200).json({ schedules });
    } catch (err) {
      console.error('Error fetching schedules:', err.message);
      res.status(500).json({ message: 'Error fetching schedules', error: err.message });
    }
  };


  
// View seat bookings for operator's buses
exports.getSeatBookingsForOperator = async (req, res) => {
  try {
    const operatorId = req.user.operatorId; // Get operatorId from token
    const { busNumber } = req.query; // Optional bus number filter

    // Find buses associated with the operator
    const buses = await Bus.find({ operatorId });
    if (!buses.length) {
      return res.status(404).json({ message: 'No buses found for this operator' });
    }

    // Extract busNumbers for filtering bookings
    const busNumbers = buses.map((bus) => bus.busNumber);

    // Validate busNumber if provided
    if (busNumber) {
      if (!busNumbers.includes(busNumber)) {
        return res.status(400).json({ message: `Bus number ${busNumber} does not belong to this operator` });
      }
    }

    // Fetch bookings for the operator's buses or the specified busNumber
    const filter = busNumber ? { busNumber } : { busNumber: { $in: busNumbers } };
    const bookings = await Booking.find(filter)
      .select('busNumber seatNumber passengerName boardingPlace destinationPlace date')
      .sort({ date: 1, seatNumber: 1 }); // Sort by date and seat number

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for the specified bus number' });
    }

    res.status(200).json({ bookings });
  } catch (err) {
    console.error('Error fetching seat bookings:', err.message);
    res.status(500).json({ message: 'Error fetching seat bookings', error: err.message });
  }
};

exports.reassignBusInSchedule = async (req, res) => {
  const { scheduleId, newBusNumber } = req.body;

  try {
    // Validate input
    if (!scheduleId || !newBusNumber) {
      return res.status(400).json({ message: 'Schedule ID and new bus number are required' });
    }

    // Find the schedule
    const schedule = await Schedule.findOne({ scheduleId });
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Check if the new bus is valid and active
    const newBus = await Bus.findOne({ busNumber: newBusNumber, isActive: true });
    if (!newBus) {
      return res.status(404).json({ message: 'New bus not found or is inactive' });
    }

    // Check if the new bus is already scheduled at the same time
    const conflictingSchedule = await Schedule.findOne({
      busNumber: newBusNumber,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    });
    if (conflictingSchedule) {
      return res.status(400).json({ message: 'New bus is already scheduled for this time' });
    }

    // Update the schedule with the new bus
    const oldBusNumber = schedule.busNumber;
    schedule.busNumber = newBusNumber;
    await schedule.save();

    // Update all bookings for the old bus to the new bus
    await Booking.updateMany(
      { busNumber: oldBusNumber, date: { $gte: schedule.startTime, $lte: schedule.endTime } },
      { $set: { busNumber: newBusNumber } }
    );

    res.status(200).json({ message: 'Bus reassigned successfully', schedule });
  } catch (err) {
    console.error('Error reassigning bus:', err.message);
    res.status(500).json({ message: 'Error reassigning bus', error: err.message });
  }
};
