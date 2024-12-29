const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use Gmail or another email service
      auth: {
        user: 'singhesinghe123@gmail.com',
      pass: 'szcb aqkv woqj vpwl',
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    throw new Error('Email sending failed');
  }
};

module.exports = sendEmail;
