const express = require('express');
const router = express.Router();
const { adminLogin, getAdminProfile } = require('../../controllers/admin/adminController');
const protect = require('../../middlewares/authMiddleware');
const verifyAdminRole = require('../../middlewares/roleMiddleware');

// Admin login route (public)
router.post('/login', adminLogin);

// Admin profile route (protected)
router.get('/profile', protect, verifyAdminRole, getAdminProfile);

module.exports = router;
