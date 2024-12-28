const bcrypt = require('bcryptjs');

const verifyPassword = async () => {
  const plainPassword = 'AdminPassword123';
  const hashedPassword = '$2a$10$ookr/VdOXXozTyst5vDn2eWl6UBeV5lMHil63lNTSkM2MV9UValF6'; // Password from your database

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

  if (isMatch) {
    console.log('Password matches!');
  } else {
    console.log('Password does not match.');
  }
};

verifyPassword();
