const BusOperator = require('../../models/admin/busOperatorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Bus Operator Login
exports.operatorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find operator by email
    const operator = await BusOperator.findOne({ email });
    if (!operator || !operator.isActive) {
      return res.status(400).json({ message: 'Invalid credentials or inactive account' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, operator.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(operator.id, operator.role);
    res.json({ token, operator: { id: operator.id, name: operator.name, email: operator.email, role: operator.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Operator Profile
exports.getOperatorProfile = async (req, res) => {
  try {
    const operator = await BusOperator.findById(req.user.id).select('-password');
    if (!operator) {
      return res.status(404).json({ message: 'Bus operator not found' });
    }
    res.json(operator);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
