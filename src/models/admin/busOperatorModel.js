const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const busOperatorSchema = new mongoose.Schema(
  {
    operatorId: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    nic: { type: String, required: true, unique: true },
    role: { type: String, enum: ['operator'], default: 'operator' }, // Role field
  },
  { timestamps: true }
);

// Hash password before saving
busOperatorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
busOperatorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('BusOperator', busOperatorSchema);
