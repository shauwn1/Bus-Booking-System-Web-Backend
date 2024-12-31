const express = require('express');
const router = express.Router();
const { createSchedule, getSchedules, updateSchedule } = require('../../controllers/admin/scheduleController');
const protect = require('../../middlewares/authMiddleware');

// Create a Schedule (admin only)
router.post('/add', protect, createSchedule);

// Get All Schedules (admin only)
router.get('/', protect, getSchedules);

// Update a Schedule (admin only)
router.put('/update/:id', protect, updateSchedule);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: Schedule management
 */

/**
 * @swagger
 * /api/admin/schedules/add:
 *   post:
 *     summary: Create a schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: string
 *               routeId:
 *                 type: string
 *               startPoint:
 *                 type: string
 *               endPoint:
 *                 type: string
 *               busNumber:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               stops:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stopName:
 *                       type: string
 *                     arrivalTime:
 *                       type: string
 *                       format: date-time
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/schedules:
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of schedules
 *       404:
 *         description: No schedules found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/schedules/update/{id}:
 *   put:
 *     summary: Update a schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeId:
 *                 type: string
 *               busNumber:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */
