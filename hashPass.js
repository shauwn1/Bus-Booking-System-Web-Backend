const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(plainPassword, salt); // Hash the password
    console.log('Hashed Password:', hashedPassword);
  } catch (err) {
    console.error('Error hashing password:', err.message);
  }
};

// Call the function with your admin's plaintext password
hashPassword('AdminPassword123');
