const express = require('express');
const {
  addBusOperator,
  updateBusOperator,
  getBusOperators,
  deactivateBusOperator,
} = require('../../controllers/admin/busOperatorController');
const protect = require('../../middlewares/authMiddleware');
const verifyAdminRole = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Protect all bus operator-related routes
router.post('/', protect, verifyAdminRole, addBusOperator);
router.put('/:id', protect, verifyAdminRole, updateBusOperator);
router.get('/', protect, verifyAdminRole, getBusOperators);
router.delete('/:id', protect, verifyAdminRole, deactivateBusOperator);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: BusOperator
 *   description: Bus operator management
 */

/**
 * @swagger
 * /bus-operators:
 *   post:
 *     summary: Add a bus operator
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               operatorId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nic:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bus operator added
 *       400:
 *         description: Operator ID, Email, or NIC already exists
 */

/**
 * @swagger
 * /bus-operators:
 *   get:
 *     summary: Get all bus operators
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bus operators
 *       404:
 *         description: No bus operators found
 */
