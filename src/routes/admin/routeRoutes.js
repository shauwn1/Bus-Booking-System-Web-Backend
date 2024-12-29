const express = require('express');
const {
  createRoute,
  getRoutes,
  updateRoute,
  deleteRoute
} = require('../../controllers/admin/routeController');
const protect = require('../../middlewares/authMiddleware'); // Ensure this line is present
const verifyAdminRole = require('../../middlewares/roleMiddleware'); // Ensure this line is present

const router = express.Router();

// Create a Route
router.post('/', protect, verifyAdminRole, createRoute);

// Get All Routes or Filter by Criteria
router.get('/', protect, verifyAdminRole, getRoutes);

// Update a Route
router.put('/:id', protect, verifyAdminRole, updateRoute);

// Delete a Route by routeId
router.delete('/:id', protect, verifyAdminRole, deleteRoute);

module.exports = router;

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a route
 *     tags: [Route]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeId:
 *                 type: string
 *               startPoint:
 *                 type: string
 *               endPoint:
 *                 type: string
 *               distance:
 *                 type: number
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *               prices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                     to:
 *                       type: string
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Validation error or missing prices for stop combinations
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes or filter by criteria
 *     tags: [Route]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startPoint
 *         schema:
 *           type: string
 *         description: Starting point of the route
 *       - in: query
 *         name: endPoint
 *         schema:
 *           type: string
 *         description: Ending point of the route
 *     responses:
 *       200:
 *         description: List of routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   routeId:
 *                     type: string
 *                   startPoint:
 *                     type: string
 *                   endPoint:
 *                     type: string
 *                   distance:
 *                     type: number
 *                   stops:
 *                     type: array
 *                     items:
 *                       type: string
 *       404:
 *         description: No routes found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   put:
 *     summary: Update a route
 *     tags: [Route]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startPoint:
 *                 type: string
 *               endPoint:
 *                 type: string
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *               prices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                     example: Colombo
 *                     description: Starting stop
 *                     required: true
 *                     type: string
 *                     example: Kandy
 *                     description: Destination stop
 *                     price:
 *                       type: number
 *                       example: 700 
 *     responses:
 *       200:
 *         description: Route updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 676d6bd6952ba42c62c436eb
 *                 routeId:
 *                   type: string
 *                   example: A3
 *                 startPoint:
 *                   type: string
 *                   example: Colombo
 *                 endPoint:
 *                   type: string
 *                   example: Kandy
 *                 distance:
 *                   type: number
 *                   example: 115
 *                 stops:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: [Kegalle, Mawanella, Peradeniya, Katugasthota]
 *                 prices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       from:
 *                         type: string
 *                         example: Colombo
 *                       to:
 *                         type: string
 *                         example: Kandy
 *                       price:
 *                         type: number
 *                         example: 1200
 *       404:
 *         description: Route not found
 *       400:
 *         description: Validation error or missing prices
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Delete a route by routeId
 *     tags: [Route]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route deleted successfully
 *                 route:
 *                   type: object
 *                   properties:
 *                     routeId:
 *                       type: string
 *                       example: A4
 *                     startPoint:
 *                       type: string
 *                       example: CityA
 *                     endPoint:
 *                       type: string
 *                       example: CityB
 *                     distance:
 *                       type: number
 *                       example: 100
 *                     stops:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: [CityA, Stop1, Stop2, CityB]
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route not found
 *       500:
 *         description: Server error
 */

