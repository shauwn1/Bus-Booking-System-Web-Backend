const express = require('express');
const router = express.Router();
const { createRoute, getRoutes, updateRoute } = require('../../controllers/admin/routeController');

// Create a Route
router.post('/', createRoute);

// Get All Routes or Filter by Criteria
router.get('/', getRoutes);

// Update a Route
router.put('/:id', updateRoute);

module.exports = router;
