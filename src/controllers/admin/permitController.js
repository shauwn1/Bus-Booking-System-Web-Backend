const Permit = require('../../models/admin/permitModel');
const Bus = require('../../models/admin/busModel');
const Route = require('../../models/admin/routeModel');

exports.issuePermit = async (req, res) => {
  const { permitNumber, busNumber, routeId, validFrom, validTo } = req.body;

  try {
    // Check required fields
    if (!permitNumber || !busNumber || !routeId || !validFrom || !validTo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate busNumber
    const bus = await Bus.findOne({ busNumber });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found with the given busNumber' });
    }

    // Check if permitNumber already exists
    const existingPermit = await Permit.findOne({ permitNumber });
    if (existingPermit) {
      return res.status(400).json({ message: 'Permit number already exists' });
    }

    // Check date validity
    if (new Date(validFrom) < new Date()) {
      return res.status(400).json({ message: 'validFrom date cannot be in the past' });
    }
    if (new Date(validTo) <= new Date(validFrom)) {
      return res.status(400).json({ message: 'validTo date must be after validFrom date' });
    }

    // Create and save the permit
    const permit = new Permit({
      permitNumber,
      busNumber,
      routeId,
      validFrom,
      validTo,
      isActive: true,
    });
    const savedPermit = await permit.save();
    res.status(201).json(savedPermit);
  } catch (err) {
    res.status(500).json({ message: 'Error issuing permit', error: err.message });
  }
};

// Update a Permit
exports.updatePermit = async (req, res) => {
  const { id } = req.params;
  const { validFrom, validTo, isActive } = req.body;

  try {
    const permit = await Permit.findById(id);
    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    // Validate and update fields
    if (validFrom && new Date(validFrom) < new Date()) {
      return res.status(400).json({ message: 'validFrom date cannot be in the past' });
    }
    if (validTo && new Date(validTo) <= new Date(validFrom)) {
      return res.status(400).json({ message: 'validTo date must be after validFrom date' });
    }

    if (validFrom) permit.validFrom = validFrom;
    if (validTo) permit.validTo = validTo;
    if (typeof isActive === 'boolean') permit.isActive = isActive;

    const updatedPermit = await permit.save();
    res.status(200).json(updatedPermit);
  } catch (err) {
    res.status(500).json({ message: 'Error updating permit', error: err.message });
  }
};

// Get All Permits
exports.getPermits = async (req, res) => {
  const { routeId, busNumber, isActive } = req.query;

  try {
    const query = {};
    if (routeId) query.routeId = routeId;
    if (busNumber) query.busNumber = busNumber;
    if (isActive) query.isActive = isActive === 'true';

    const permits = await Permit.find(query)
      .populate('routeId', 'routeId startPoint endPoint distance'); // Populate route details if required

    res.status(200).json(permits);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching permits', error: err.message });
  }
};


// Deactivate a Permit
exports.deactivatePermit = async (req, res) => {
  const { id } = req.params;

  try {
    const permit = await Permit.findById(id);
    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    permit.isActive = false; // Mark as inactive
    const deactivatedPermit = await permit.save();
    res.status(200).json({ message: 'Permit deactivated', deactivatedPermit });
  } catch (err) {
    res.status(500).json({ message: 'Error deactivating permit', error: err.message });
  }
};
