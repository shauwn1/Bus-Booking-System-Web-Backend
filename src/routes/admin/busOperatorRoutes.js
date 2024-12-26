const express = require('express');
const router = express.Router();
const {
  addBusOperator,
  updateBusOperator,
  getBusOperators,
  deactivateBusOperator,
} = require('../../controllers/admin/busOperatorController'); // Ensure this path is correct

// Add a bus operator
router.post('/', addBusOperator);

// Update a bus operator
router.put('/:id', updateBusOperator); // Ensure `updateBusOperator` is properly imported

// Get all bus operators
router.get('/', getBusOperators);

// Deactivate a bus operator
router.delete('/:id', deactivateBusOperator);

module.exports = router;
