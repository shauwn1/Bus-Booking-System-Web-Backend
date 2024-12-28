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

/**
 * @swagger
 * tags:
 *   name: Route
 *   description: Route management
 */

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a route
 *     tags: [Route]
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
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes or filter by criteria
 *     tags: [Route]
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
 *               distance:
 *                 type: number
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       404:
 *         description: Route not found
 *       500:
 *         description: Server error
 */
