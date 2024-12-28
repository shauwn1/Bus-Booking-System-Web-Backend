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
hashPassword('StrongPass123');



const storedHash = "$2a$10$uhPt2JuR5CzQ1WeZbU5K4OYXPfTEhehtXwSDsLoKz1cZOfrzRs3uq"; // Replace with the hashed password from your database
const plainPassword = "StrongPass123"; // Replace with the password you're testing

bcrypt.compare(plainPassword, storedHash, (err, isMatch) => {
  if (err) throw err;
  console.log("Password match:", isMatch); // Should log true if it matches
});

