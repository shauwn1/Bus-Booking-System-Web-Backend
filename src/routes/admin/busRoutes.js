const express = require('express');
const { addBus, updateBus, getBuses, deactivateBus } = require('../../controllers/admin/busController');
const protect = require('../../middlewares/authMiddleware');
const verifyAdminRole = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Protect all bus-related routes
router.post('/', protect, verifyAdminRole, addBus);
router.put('/:id', protect, verifyAdminRole, updateBus);
router.get('/', protect, verifyAdminRole, getBuses);
router.delete('/:id', protect, verifyAdminRole, deactivateBus);

module.exports = router;
