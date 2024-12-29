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
 *                 example: CCC-7777
 *               type:
 *                 type: string
 *                 enum: [Luxury, Semi-Luxury, Normal]
 *                 example: Luxury
 *               capacity:
 *                 type: integer
 *                 minimum: 10
 *                 maximum: 100
 *                 example: 50
 *               operatorId:
 *                 type: string
 *                 example: op-3094
 *     responses:
 *       201:
 *         description: Bus added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busNumber:
 *                   type: string
 *                   example: CCC-7778
 *                 type:
 *                   type: string
 *                   example: Luxury
 *                 capacity:
 *                   type: integer
 *                   example: 50
 *                 operatorId:
 *                   type: string
 *                   example: op-3094
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 _id:
 *                   type: string
 *                   example: 67716428234e5865901d9f40
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Validation error or duplicate bus number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus number already exists
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   busNumber:
 *                     type: string
 *                     example: CCC-7778
 *                   type:
 *                     type: string
 *                     example: Luxury
 *                   capacity:
 *                     type: integer
 *                     example: 50
 *                   operatorId:
 *                     type: string
 *                     example: op-3094
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   _id:
 *                     type: string
 *                     example: 67716428234e5865901d9f40
 *                   __v:
 *                     type: integer
 *                     example: 0
 */


/**
 * @swagger
 * /buses/{id}:
 *   put:
 *     summary: Update bus details
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus number to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Luxury, Semi-Luxury, Normal]
 *                 example: Luxury
 *               capacity:
 *                 type: integer
 *                 minimum: 10
 *                 maximum: 100
 *                 example: 50
 *               operatorId:
 *                 type: string
 *                 example: op-3094
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67716428234e5865901d9f40
 *                 busNumber:
 *                   type: string
 *                   example: CCC-7778
 *                 type:
 *                   type: string
 *                   example: Luxury
 *                 capacity:
 *                   type: integer
 *                   example: 4
 *                 operatorId:
 *                   type: string
 *                   example: op-3094
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus not found
 */


/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Deactivate a bus
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus number to deactivate
 *     responses:
 *       200:
 *         description: Bus deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus deactivated
 *                 deactivatedBus:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67716428234e5865901d9f40
 *                     busNumber:
 *                       type: string
 *                       example: CCC-7778
 *                     type:
 *                       type: string
 *                       example: Luxury
 *                     capacity:
 *                       type: integer
 *                       example: 4
 *                     operatorId:
 *                       type: string
 *                       example: op-3094
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus not found
 */
