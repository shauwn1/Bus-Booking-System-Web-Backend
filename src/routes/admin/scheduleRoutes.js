const express = require('express');
const router = express.Router();
const { createSchedule, getSchedules, updateSchedule } = require('../../controllers/admin/scheduleController');
const protect = require('../../middlewares/authMiddleware');

// Create a Schedule (admin only)
router.post('/', protect, createSchedule);

// Get All Schedules (admin only)
router.get('/', protect, getSchedules);

// Update a Schedule (admin only)
router.put('/:id', protect, updateSchedule);

module.exports = router;
