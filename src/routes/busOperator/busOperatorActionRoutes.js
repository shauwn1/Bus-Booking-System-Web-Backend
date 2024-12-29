const express = require('express');
const {
  getSchedulesForOperator,
  getSeatBookingsForOperator,
  reassignBusInSchedule,
} = require('../../controllers/busOperator/busOperatorActionsController');
const operatorProtect = require('../../middlewares/operatorAuthMiddleware');

const router = express.Router();

// Route to view schedules for operator's buses
router.get('/schedules', operatorProtect, getSchedulesForOperator);

// Route to view seat bookings for operator's buses
router.get('/bookings', operatorProtect, getSeatBookingsForOperator);

// Route to reassign a bus
router.put('/reassign-bus', operatorProtect, reassignBusInSchedule);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: BusOperatorActions
 *   description: Bus operator-specific actions
 */

/**
 * @swagger
 * /bus-operators/actions/schedules:
 *   get:
 *     summary: View schedules for operator's buses
 *     tags: [BusOperatorActions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter schedules
 *     responses:
 *       200:
 *         description: List of schedules for operator's buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       scheduleId:
 *                         type: string
 *                       routeId:
 *                         type: string
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                       busNumber:
 *                         type: string
 *       404:
 *         description: No schedules found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /bus-operators/actions/bookings:
 *   get:
 *     summary: View seat bookings for operator's buses
 *     tags: [BusOperatorActions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: busNumber
 *         schema:
 *           type: string
 *         description: Filter bookings by bus number
 *     responses:
 *       200:
 *         description: List of seat bookings for operator's buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       busNumber:
 *                         type: string
 *                       seatNumber:
 *                         type: number
 *                       passengerName:
 *                         type: string
 *                       boardingPlace:
 *                         type: string
 *                       destinationPlace:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date
 *       404:
 *         description: No bookings found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /bus-operators/actions/reassign-bus:
 *   put:
 *     summary: Reassign a bus in a schedule
 *     tags: [BusOperatorActions]
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
 *                 description: ID of the schedule to update
 *               newBusNumber:
 *                 type: string
 *                 description: New bus number to assign to the schedule
 *     responses:
 *       200:
 *         description: Bus reassigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 schedule:
 *                   type: object
 *                   properties:
 *                     scheduleId:
 *                       type: string
 *                     busNumber:
 *                       type: string
 *       400:
 *         description: Validation error
 *       404:
 *         description: Schedule or bus not found
 *       500:
 *         description: Server error
 */
