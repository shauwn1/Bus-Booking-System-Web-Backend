const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message, qrCodeData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'singhesinghe123@gmail.com',
        pass: 'szcb aqkv woqj vpwl', // Replace with a secure app password
      },
    });

    const mailOptions = {
      from: 'singhesinghe123@gmail.com',
      to: email,
      subject: subject,
      html: `
        <p>${message}</p>
        ${qrCodeData ? '<p><strong>Your QR Code:</strong></p><img src="cid:qrCodeImage" alt="QR Code" />' : ''}
      `,
      attachments: qrCodeData
        ? [
            {
              filename: 'qrCode.png',
              content: qrCodeData.split(',')[1], // Extract Base64 data
              encoding: 'base64',
              cid: 'qrCodeImage', // Content ID for embedding in email
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    throw new Error('Email sending failed');
  }
};

module.exports = sendEmail;
