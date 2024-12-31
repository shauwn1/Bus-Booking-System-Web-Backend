require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('./swaggerOptions'); // Import your swaggerOptions.js


// Import Routes
const adminRoutes = require('./routes/admin/adminRoutes');
const busOperatorRoutes = require('./routes/admin/busOperatorRoutes');
const commuterRoutes = require('./routes/commuter/commuterRoutes'); // Updated path
const routeRoutes = require('./routes/admin/routeRoutes');
const scheduleRoutes = require('./routes/admin/scheduleRoutes');
const busRoutes = require('./routes/admin/busRoutes');
const permitRoutes = require('./routes/admin/permitRoutes');
const busOperatorAuthRoutes = require('./routes/busOperator/busOperatorAuthRoutes');
const busOperatorActionsRoutes = require('./routes/busOperator/busOperatorActionRoutes.js'); // For operator-specific actions
const bookingRoutes = require('./routes/commuter/commuterRoutes');
// Import Error Handling Middleware
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(rateLimiter); // Apply rate limiting

// Connect to Database
connectDB();

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

// API Routes
app.use('/api/admin', adminRoutes); // Admin-related routes
app.use('/api/bus-operators', busOperatorRoutes); // Bus operator-related routes
app.use('/api/commuters', commuterRoutes); // Commuter-related routes
app.use('/api/routes', routeRoutes); // For routes management
app.use('/api/schedules', scheduleRoutes); // For schedules management
app.use('/api/admin/buses', busRoutes); // For bus management
app.use('/api/admin/permits', permitRoutes); // Permit routes
app.use('/api/bus-operators/auth', busOperatorAuthRoutes);
app.use('/api/bus-operators/actions', busOperatorActionsRoutes); // Operator-specific actions
app.use('/api', bookingRoutes);
// Error Handling Middleware
app.use(errorHandler);





// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
