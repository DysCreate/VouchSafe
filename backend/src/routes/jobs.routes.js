const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { accept, reject, complete } = require('../controllers/jobs.controller');

router.post('/:id/accept', auth, accept);
router.post('/:id/reject', auth, reject);
router.post('/:id/complete', auth, complete);

module.exports = router;
