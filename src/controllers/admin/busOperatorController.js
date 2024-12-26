const BusOperator = require('../../models/admin/busOperatorModel');

// Add Bus Operator
const bcrypt = require('bcryptjs');

exports.addBusOperator = async (req, res) => {
  const { operatorId, name, email, password, nic } = req.body;

  try {
    // Check if operatorId, email, or NIC already exists
    const existingOperator = await BusOperator.findOne({
      $or: [{ operatorId }, { email }, { nic }],
    });
    if (existingOperator) {
      return res.status(400).json({ message: 'Operator ID, Email, or NIC already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the operator
    const operator = new BusOperator({ operatorId, name, email, password: hashedPassword, nic });
    const savedOperator = await operator.save();
    res.status(201).json(savedOperator);
  } catch (err) {
    res.status(500).json({ message: 'Error adding bus operator', error: err.message });
  }
};



// Update Bus Operator
exports.updateBusOperator = async (req, res) => {
    const { id } = req.params;
    const { name, email, isActive, nic, password } = req.body;
  
    try {
      const operator = await BusOperator.findById(id);
      if (!operator) {
        return res.status(404).json({ message: 'Bus operator not found' });
      }
  
      // Update fields
      if (name) operator.name = name;
      if (email) operator.email = email;
      if (nic) operator.nic = nic;
      if (typeof isActive === 'boolean') operator.isActive = isActive;
  
      // Hash and update password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        operator.password = await bcrypt.hash(password, salt);
      }
  
      const updatedOperator = await operator.save();
      res.status(200).json(updatedOperator);
    } catch (err) {
      res.status(500).json({ message: 'Error updating bus operator', error: err.message });
    }
  };
  

  
  // View All Bus Operators
  exports.getBusOperators = async (req, res) => {
    try {
      const operators = await BusOperator.find();
      if (!operators.length) {
        return res.status(404).json({ message: 'No bus operators found' });
      }
      res.status(200).json(operators);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving bus operators', error: err.message });
    }
  };
  

  // Deactivate Bus Operator
  exports.deactivateBusOperator = async (req, res) => {
    const { id } = req.params;
  
    try {
      const operator = await BusOperator.findById(id);
      if (!operator) {
        return res.status(404).json({ message: 'Bus operator not found' });
      }
  
      // Mark as inactive
      if (!operator.isActive) {
        return res.status(400).json({ message: 'Bus operator is already deactivated' });
      }
  
      operator.isActive = false;
      const deactivatedOperator = await operator.save();
      res.status(200).json({ message: 'Bus operator deactivated successfully', deactivatedOperator });
    } catch (err) {
      res.status(500).json({ message: 'Error deactivating bus operator', error: err.message });
    }
  };
  

  


