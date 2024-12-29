const express = require('express');
const {
  addBusOperator,
  updateBusOperator,
  getBusOperators,
  deactivateBusOperator,
  getBusOperatorById,
} = require('../../controllers/admin/busOperatorController');
const protect = require('../../middlewares/authMiddleware');
const verifyAdminRole = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Protect all bus operator-related routes
router.post('/', protect, verifyAdminRole, addBusOperator);
router.put('/:id', protect, verifyAdminRole, updateBusOperator);
router.get('/', protect, verifyAdminRole, getBusOperators);
router.get('/:operatorId', protect, verifyAdminRole, getBusOperatorById);
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
 *                 example: op-3094
 *               name:
 *                 type: string
 *                 example: Abhishek
 *               email:
 *                 type: string
 *                 example: mudiyansew@gmail.com
 *               password:
 *                 type: string
 *                 description: Encrypted password (hashed)
 *                 example: $2a$10$9nLwBNLPqfbYlPHa0MesDe578LrJcuKJTi5Iu7KkMBDD3zuqTXF/S
 *               nic:
 *                 type: string
 *                 example: 200018604594
 *               role:
 *                 type: string
 *                 example: operator
 *     responses:
 *       201:
 *         description: Bus operator added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67715caea5db55e686a429cc
 *                 operatorId:
 *                   type: string
 *                   example: op-3094
 *                 name:
 *                   type: string
 *                   example: Abhishek
 *                 email:
 *                   type: string
 *                   example: mudiyansew@gmail.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 nic:
 *                   type: string
 *                   example: 200018604594
 *                 role:
 *                   type: string
 *                   example: operator
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-29T14:29:02.970Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-29T14:29:02.970Z
 *       400:
 *         description: Operator ID, Email, or NIC already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Operator ID, Email, or NIC already in use
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 67715caea5db55e686a429cc
 *                   operatorId:
 *                     type: string
 *                     example: op-3094
 *                   name:
 *                     type: string
 *                     example: Abhishek
 *                   email:
 *                     type: string
 *                     example: mudiyansew@gmail.com
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   nic:
 *                     type: string
 *                     example: 200018604594
 *                   role:
 *                     type: string
 *                     example: operator
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-12-29T14:29:02.970Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-12-29T14:29:02.970Z
 *       404:
 *         description: No bus operators found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No bus operators found
 */


/**
 * @swagger
 * /bus-operators/{operatorId}:
 *   get:
 *     summary: Get a bus operator by operatorId
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: operatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Operator ID
 *     responses:
 *       200:
 *         description: Bus operator retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67715caea5db55e686a429cc
 *                 operatorId:
 *                   type: string
 *                   example: op-3094
 *                 name:
 *                   type: string
 *                   example: Abhishek
 *                 email:
 *                   type: string
 *                   example: mudiyansew@gmail.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 nic:
 *                   type: string
 *                   example: 200018604594
 *                 role:
 *                   type: string
 *                   example: operator
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-29T14:29:02.970Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-29T14:49:47.903Z
 *       404:
 *         description: Bus operator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus operator not found
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /bus-operators/{id}:
 *   put:
 *     summary: Update a bus operator
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Operator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ranasinghe
 *               email:
 *                 type: string
 *                 example: mudiyansew@gmail.com
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               nic:
 *                 type: string
 *                 example: 200018604594
 *               password:
 *                 type: string
 *                 description: Encrypted password (hashed)
 *                 example: $2a$10$9nLwBNLPqfbYlPHa0MesDe578LrJcuKJTi5Iu7KkMBDD3zuqTXF/S
 *     responses:
 *       200:
 *         description: Bus operator updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67715caea5db55e686a429cc
 *                 operatorId:
 *                   type: string
 *                   example: op-3094
 *                 name:
 *                   type: string
 *                   example: Ranasinghe
 *                 email:
 *                   type: string
 *                   example: mudiyansew@gmail.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 nic:
 *                   type: string
 *                   example: 200018604594
 *                 role:
 *                   type: string
 *                   example: operator
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-29T14:29:02.970Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-29T14:49:47.903Z
 *       404:
 *         description: Bus operator not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /bus-operators/{operatorId}:
 *   delete:
 *     summary: Deactivate a bus operator
 *     tags: [BusOperator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: operatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The operatorId of the bus operator to deactivate
 *     responses:
 *       200:
 *         description: Bus operator deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus operator deactivated successfully
 *                 deactivatedOperator:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 676ffc34f40bf04e0efa09a4
 *                     operatorId:
 *                       type: string
 *                       example: op-3333
 *                     name:
 *                       type: string
 *                       example: Sunrise
 *                     email:
 *                       type: string
 *                       example: m@gmail.com
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *                     nic:
 *                       type: string
 *                       example: 12344321v
 *                     role:
 *                       type: string
 *                       example: operator
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-28T13:25:08.770Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-29T14:57:46.556Z
 *       404:
 *         description: Bus operator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus operator not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deactivating bus operator
 *                 error:
 *                   type: string
 *                   example: Detailed error message
 */
