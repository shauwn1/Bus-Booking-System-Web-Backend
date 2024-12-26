const express = require('express');
const router = express.Router();
const { createSchedule, getSchedules, updateSchedule } = require('../../controllers/admin/scheduleController');

// Create a Schedule
router.post('/', createSchedule);

// Get All Schedules
router.get('/', getSchedules);

// Update a Schedule
router.put('/:id', updateSchedule);

module.exports = router;
