const Schedule = require('../../models/admin/scheduleModel');
const Bus = require('../../models/admin/busModel');
const Route = require('../../models/admin/routeModel');
const Permit = require('../../models/admin/permitModel');

exports.createSchedule = async (req, res) => {
  const { routeId, busNumber, startTime, endTime, stops, days } = req.body;

  try {
    // Validate Route
    const route = await Route.findOne({ routeId });
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Validate Bus using busNumber
    const bus = await Bus.findOne({ busNumber });
    if (!bus || !bus.isActive) {
      return res.status(400).json({ message: 'Bus is inactive or not found' });
    }

    // Validate Permit
    const permit = await Permit.findOne({
      busNumber, // Match by busNumber
      routeId,
      validFrom: { $lte: new Date(startTime) },
      validTo: { $gte: new Date(endTime) },
      isActive: true,
    });
    if (!permit) {
      return res.status(400).json({ message: 'No valid permit found for this bus and route' });
    }

    // Create the schedule
    const schedule = new Schedule({
      routeId,
      busNumber, // Use busNumber as required by the schema
      startTime,
      endTime,
      stops,
      days,
    });
    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    console.error('Error creating schedule:', err.message);
    res.status(500).json({ message: 'Error creating schedule', error: err.message });
  }
};



// Get All Schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('routeId', 'routeId startPoint endPoint distance')
      .populate('busId', 'busNumber type capacity');
    res.status(200).json(schedules);
  } catch (err) {
    console.error('Error fetching schedules:', err.message);
    res.status(500).json({ message: 'Error fetching schedules', error: err.message });
  }
};

// Update Schedule
exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { routeId, busNumber, startTime, endTime, stops, days } = req.body;

  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Validate routeId if provided
    if (routeId) {
      const route = await Route.findOne({ routeId });
      if (!route) {
        return res.status(404).json({ message: 'Route not found' });
      }
      schedule.routeId = routeId;
    }

    // Validate and update bus if busNumber is provided
    if (busNumber) {
      const bus = await Bus.findOne({ busNumber });
      if (!bus || !bus.isActive) {
        return res.status(400).json({ message: 'Bus is inactive or not found' });
      }
      schedule.busId = bus._id; // Update with the ObjectId
    }

    // Update fields if provided
    if (startTime) schedule.startTime = startTime;
    if (endTime) schedule.endTime = endTime;
    if (stops) schedule.stops = stops;
    if (days) schedule.days = days;

    const updatedSchedule = await schedule.save();
    res.status(200).json(updatedSchedule);
  } catch (err) {
    console.error('Error updating schedule:', err.message);
    res.status(500).json({ message: 'Error updating schedule', error: err.message });
  }
};
