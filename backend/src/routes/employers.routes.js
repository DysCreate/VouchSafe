const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');
const { dashboard, jobRequest } = require('../controllers/employers.controller');

router.get('/dashboard', auth, requireRole('EMPLOYER'), dashboard);
router.post('/job-request', auth, requireRole('EMPLOYER'), jobRequest);

module.exports = router;
