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
