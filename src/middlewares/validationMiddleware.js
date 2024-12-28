const Joi = require('joi');

// Bus validation schema
const busValidationSchema = Joi.object({
  busNumber: Joi.string().required(),
  type: Joi.string().valid('Luxury', 'Semi-Luxury', 'Normal').required(),
  capacity: Joi.number().integer().min(10).max(100).required(),
  operatorId: Joi.string().required(),
});

// Middleware for validating input
exports.validateBus = (req, res, next) => {
  const { error } = busValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
