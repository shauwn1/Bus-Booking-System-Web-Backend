// Error-handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the stack trace (optional for debugging)
  
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  };
  
  module.exports = errorHandler;
  