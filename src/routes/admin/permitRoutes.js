const express = require('express');
const {
  issuePermit,
  updatePermit,
  getPermits,
  deactivatePermit,
} = require('../../controllers/admin/permitController');

const router = express.Router();

// Issue a Permit
router.post('/', issuePermit);

// Update a Permit
router.put('/:id', updatePermit);

// Get All Permits
router.get('/', getPermits);

// Deactivate a Permit
router.delete('/:id', deactivatePermit);

module.exports = router;
