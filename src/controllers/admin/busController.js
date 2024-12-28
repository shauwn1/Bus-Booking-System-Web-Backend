const Bus = require('../../models/admin/busModel');
const BusOperator = require('../../models/admin/busOperatorModel'); // Import the BusOperator model

// Add a Bus
exports.addBus = async (req, res) => {
  const { busNumber, type, capacity, operatorId } = req.body;

  try {
    // Validate the operatorId
    const operator = await BusOperator.findOne({ operatorId }); // Ensure the operatorId exists in the BusOperator collection
    if (!operator) {
      return res.status(400).json({ message: 'Invalid operatorId: Operator not found' });
    }

    // Check if busNumber already exists
    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return res.status(400).json({ message: 'Bus number already exists' });
    }

    // Create and save the bus
    const bus = new Bus({ busNumber, type, capacity, operatorId });
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(500).json({ message: 'Error adding bus', error: err.message });
  }
};



// Update a Bus
exports.updateBus = async (req, res) => {
  const { id } = req.params; // This should be the busNumber, not the _id
  const { type, capacity, isActive } = req.body;

  try {
    // Find the bus by busNumber instead of _id
    const bus = await Bus.findOne({ busNumber: id });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Update fields
    if (type) bus.type = type;
    if (capacity) bus.capacity = capacity;
    if (typeof isActive === 'boolean') bus.isActive = isActive;

    const updatedBus = await bus.save();
    res.status(200).json(updatedBus);
  } catch (err) {
    res.status(500).json({ message: 'Error updating bus', error: err.message });
  }
};



const crypto = require('crypto');

// Get All Buses with Filtering, Sorting, Pagination, and ETag
exports.getBuses = async (req, res) => {
  try {
    const { type, capacity, isActive, sort, limit = 10, page = 1 } = req.query;

    // Filtering
    const filter = {};
    if (type) filter.type = type;
    if (capacity) filter.capacity = capacity;
    if (typeof isActive !== 'undefined') filter.isActive = isActive === 'true';

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch filtered, sorted, and paginated data
    const buses = await Bus.find(filter)
      .sort(sort || 'busNumber') // Sorting
      .skip(skip) // Pagination
      .limit(parseInt(limit)); // Limit results

    // Generate ETag for content
    const dataHash = crypto.createHash('md5').update(JSON.stringify(buses)).digest('hex');
    const clientETag = req.headers['if-none-match'];

    if (clientETag === dataHash) {
      return res.status(304).end(); // Content not modified
    }

    res.set('ETag', dataHash);
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching buses', error: err.message });
  }
};


// Deactivate a Bus
exports.deactivateBus = async (req, res) => {
  const { id } = req.params; // This is the busNumber

  try {
    // Find the bus by busNumber
    const bus = await Bus.findOne({ busNumber: id });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Mark the bus as inactive
    if (!bus.isActive) {
      return res.status(400).json({ message: 'Bus is already deactivated' });
    }
    bus.isActive = false;

    const deactivatedBus = await bus.save();
    res.status(200).json({ message: 'Bus deactivated', deactivatedBus });
  } catch (err) {
    res.status(500).json({ message: 'Error deactivating bus', error: err.message });
  }
};

