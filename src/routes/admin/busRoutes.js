const express = require('express');
const { addBus, updateBus, getBuses, deactivateBus } = require('../../controllers/admin/busController');

const router = express.Router();

// Add a Bus
router.post('/', addBus);

// Update a Bus
router.put('/:id', updateBus);

// Get All Buses
router.get('/', getBuses);

// Deactivate a Bus
router.delete('/:id', deactivateBus);

module.exports = router;
