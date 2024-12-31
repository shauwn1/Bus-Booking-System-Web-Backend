const express = require('express');
const { operatorLogin, getOperatorProfile } = require('../../controllers/busOperator/busOperatorAuthController');
const operatorProtect = require('../../middlewares/operatorAuthMiddleware');

const router = express.Router();

// Bus Operator Login (Public)
router.post('/login', operatorLogin);

// Bus Operator Profile (Protected)
router.get('/profile', operatorProtect, getOperatorProfile);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: BusOperatorAuth
 *   description: Bus operator authentication
 */

/**
 * @swagger
 * /api/bus-operators/auth/login:
 *   post:
 *     summary: Operator login
 *     tags: [BusOperatorAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 operator:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/bus-operators/auth/profile:
 *   get:
 *     summary: Get operator profile
 *     tags: [BusOperatorAuth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Operator profile retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Operator not found
 *       500:
 *         description: Server error
 */
