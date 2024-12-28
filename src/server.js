require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

// Import Routes
const adminRoutes = require('./routes/admin/adminRoutes');
const busOperatorRoutes = require('./routes/admin/busOperatorRoutes');
const commuterRoutes = require('./routes/commuter/commuterRoutes'); // Updated path
const routeRoutes = require('./routes/admin/routeRoutes');
const scheduleRoutes = require('./routes/admin/scheduleRoutes');
const busRoutes = require('./routes/admin/busRoutes');
const permitRoutes = require('./routes/admin/permitRoutes');
const busOperatorAuthRoutes = require('./routes/busOperator/busOperatorAuthRoutes');

// Import Error Handling Middleware
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// API Routes
app.use('/api/admin', adminRoutes); // Admin-related routes
app.use('/api/bus-operators', busOperatorRoutes); // Bus operator-related routes
app.use('/api/commuters', commuterRoutes); // Commuter-related routes
app.use('/api/routes', routeRoutes); // For routes management
app.use('/api/schedules', scheduleRoutes); // For schedules management
app.use('/api/admin/buses', busRoutes); // For bus management
app.use('/api/admin/permits', permitRoutes); // Permit routes
app.use('/api/bus-operators/auth', busOperatorAuthRoutes);
// Error Handling Middleware
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
