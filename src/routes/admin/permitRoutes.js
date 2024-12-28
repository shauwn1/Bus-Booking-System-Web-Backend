const express = require('express');
const {
  issuePermit,
  updatePermit,
  getPermits,
  deactivatePermit,
} = require('../../controllers/admin/permitController');
const protect = require('../../middlewares/authMiddleware');
const verifyAdminRole = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Protect all permit-related routes
router.post('/', protect, verifyAdminRole, issuePermit);
router.put('/:id', protect, verifyAdminRole, updatePermit);
router.get('/', protect, verifyAdminRole, getPermits);
router.delete('/:id', protect, verifyAdminRole, deactivatePermit);

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
 *               busNumber:
 *                 type: string
 *               routeId:
 *                 type: string
 *               validFrom:
 *                 type: string
 *                 format: date
 *               validTo:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Permit issued successfully
 *       400:
 *         description: Validation error
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
 *       404:
 *         description: No permits found
 *       500:
 *         description: Server error
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
 *         description: Permit ID
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
 *               validTo:
 *                 type: string
 *                 format: date
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Permit updated successfully
 *       404:
 *         description: Permit not found
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
 *         description: Permit ID
 *     responses:
 *       200:
 *         description: Permit deactivated successfully
 *       404:
 *         description: Permit not found
 *       500:
 *         description: Server error
 */
