const Schedule = require('../../models/admin/scheduleModel');
const Bus = require('../../models/admin/busModel');
const Route = require('../../models/admin/routeModel');
const Permit = require('../../models/admin/permitModel');

exports.createSchedule = async (req, res) => {
  const { scheduleId, routeId, busNumber, startPoint, endPoint, startTime, endTime, stops, days } = req.body;

  try {
    // Validate scheduleId uniqueness
    const existingSchedule = await Schedule.findOne({ scheduleId });
    if (existingSchedule) {
      return res.status(400).json({ message: 'Schedule ID already exists' });
    }

    // Validate Route
    const route = await Route.findOne({ routeId });
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Validate start and end points
    if (!route.stops.includes(startPoint) || !route.stops.includes(endPoint)) {
      return res.status(400).json({ message: 'Start point or end point not in route stops' });
    }

    // Validate startPoint comes before endPoint
    const startIndex = route.stops.indexOf(startPoint);
    const endIndex = route.stops.indexOf(endPoint);
    if (startIndex >= endIndex) {
      return res.status(400).json({ message: 'Start point must come before end point' });
    }

    // Validate Bus using busNumber
    const bus = await Bus.findOne({ busNumber });
    if (!bus || !bus.isActive) {
      return res.status(400).json({ message: 'Bus is inactive or not found' });
    }

    // Validate Permit
    const permit = await Permit.findOne({
      busNumber,
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
      scheduleId, // Use custom schedule ID
      routeId,
      startPoint,
      endPoint,
      busNumber,
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
  .populate({
    path: 'busNumber', // If `busNumber` needs to be populated, ensure `busNumber` is referenced correctly
    select: 'busNumber type capacity' // Fields to populate
  });
    res.status(200).json(schedules);
  } catch (err) {
    console.error('Error fetching schedules:', err.message);
    res.status(500).json({ message: 'Error fetching schedules', error: err.message });
  }
};

// Update Schedule
exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { routeId, scheduleId, busNumber, startPoint, endPoint, startTime, endTime, stops, days } = req.body;

  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Validate scheduleId uniqueness if updated
    if (scheduleId && scheduleId !== schedule.scheduleId) {
      const existingSchedule = await Schedule.findOne({ scheduleId });
      if (existingSchedule) {
        return res.status(400).json({ message: 'Schedule ID already exists' });
      }
      schedule.scheduleId = scheduleId;
    }

    // Validate Route if updated
    if (routeId && routeId !== schedule.routeId) {
      const route = await Route.findOne({ routeId });
      if (!route) {
        return res.status(404).json({ message: 'Route not found' });
      }
      schedule.routeId = routeId;

      // Validate startPoint and endPoint against updated route
      if (startPoint && !route.stops.includes(startPoint)) {
        return res.status(400).json({ message: 'Invalid start point for this route' });
      }
      if (endPoint && !route.stops.includes(endPoint)) {
        return res.status(400).json({ message: 'Invalid end point for this route' });
      }
    }

    // Update fields
    if (busNumber) schedule.busNumber = busNumber;
    if (startPoint) schedule.startPoint = startPoint;
    if (endPoint) schedule.endPoint = endPoint;
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