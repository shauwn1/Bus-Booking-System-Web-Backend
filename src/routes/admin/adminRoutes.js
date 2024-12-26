const express = require('express');
const router = express.Router();
const { adminLogin, getAdminProfile } = require('../../controllers/admin/adminController');
const protect = require('../../middlewares/authMiddleware');

// Admin login route
router.post('/login', adminLogin);

// Admin profile route (protected)
router.get('/profile', protect, getAdminProfile);

module.exports = router;
