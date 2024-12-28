const express = require('express');
const { addBus, updateBus, getBuses, deactivateBus } = require('../../controllers/admin/busController');
const { validateBus } = require('../../middlewares/validationMiddleware');
const protect = require('../../middlewares/authMiddleware');
const verifyAdminRole = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Protect all bus-related routes
router.post('/', protect, verifyAdminRole, validateBus, addBus);
router.put('/:id', protect, verifyAdminRole, updateBus);
router.get('/', protect, verifyAdminRole, getBuses);
router.delete('/:id', protect, verifyAdminRole, deactivateBus);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bus
 *   description: Bus management
 */

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Add a bus
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Luxury, Semi-Luxury, Normal]
 *               capacity:
 *                 type: integer
 *                 minimum: 10
 *                 maximum: 100
 *               operatorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bus added successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buses
 */
