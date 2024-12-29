const express = require('express');
const {
  issuePermit,
  updatePermit,
  getPermits,
  deactivatePermit,
  getPermitById,
} = require('../../controllers/admin/permitController');
const protect = require('../../middlewares/authMiddleware');
const verifyAdminRole = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Protect all permit-related routes
router.post('/', protect, verifyAdminRole, issuePermit);
router.put('/:id', protect, verifyAdminRole, updatePermit); // `id` refers to `permitNumber` here
router.get('/', protect, verifyAdminRole, getPermits);
router.delete('/:id', protect, verifyAdminRole, deactivatePermit);
router.get('/:id', protect, verifyAdminRole, getPermitById);


module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Permit
 *   description: Permit management
 */

/**
 * @swagger
 * /admin/permits:
 *   post:
 *     summary: Issue a permit
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permitNumber:
 *                 type: string
 *                 example: p-1001
 *               busNumber:
 *                 type: string
 *                 example: CCC-7777
 *               routeId:
 *                 type: string
 *                 example: r-101
 *               validFrom:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-01
 *               validTo:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *     responses:
 *       201:
 *         description: Permit issued successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permitNumber:
 *                   type: string
 *                 busNumber:
 *                   type: string
 *                 routeId:
 *                   type: string
 *                 validFrom:
 *                   type: string
 *                   format: date
 *                 validTo:
 *                   type: string
 *                   format: date
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 _id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit number already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/permits:
 *   get:
 *     summary: Get all permits
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of permits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   permitNumber:
 *                     type: string
 *                   busNumber:
 *                     type: string
 *                   routeId:
 *                     type: string
 *                   validFrom:
 *                     type: string
 *                     format: date
 *                   validTo:
 *                     type: string
 *                     format: date
 *                   isActive:
 *                     type: boolean
 *       404:
 *         description: No permits found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /admin/permits/{id}:
 *   get:
 *     summary: Get permit by ID
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permit number
 *     responses:
 *       200:
 *         description: Permit details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 permitNumber:
 *                   type: string
 *                 busNumber:
 *                   type: string
 *                 routeId:
 *                   type: object
 *                   properties:
 *                     routeId:
 *                       type: string
 *                     startPoint:
 *                       type: string
 *                     endPoint:
 *                       type: string
 *                     distance:
 *                       type: number
 *                 validFrom:
 *                   type: string
 *                   format: date
 *                 validTo:
 *                   type: string
 *                   format: date
 *                 isActive:
 *                   type: boolean
 *       404:
 *         description: Permit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching permit details
 */


/**
 * @swagger
 * /admin/permits/{id}:
 *   put:
 *     summary: Update a permit
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permit number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               validFrom:
 *                 type: string
 *                 format: date
 *                 example: 2025-02-01
 *               validTo:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Permit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 permitNumber:
 *                   type: string
 *                 busNumber:
 *                   type: string
 *                 routeId:
 *                   type: string
 *                 validFrom:
 *                   type: string
 *                   format: date
 *                 validTo:
 *                   type: string
 *                   format: date
 *                 isActive:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Permit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/permits/{id}:
 *   delete:
 *     summary: Deactivate a permit
 *     tags: [Permit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permit number
 *     responses:
 *       200:
 *         description: Permit deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit deactivated successfully
 *                 deactivatedPermit:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     permitNumber:
 *                       type: string
 *                     busNumber:
 *                       type: string
 *                     routeId:
 *                       type: string
 *                     validFrom:
 *                       type: string
 *                       format: date
 *                     validTo:
 *                       type: string
 *                       format: date
 *                     isActive:
 *                       type: boolean
 *       404:
 *         description: Permit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permit not found
 *       500:
 *         description: Server error
 */
