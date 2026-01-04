const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');
const { search, profile, dashboard } = require('../controllers/employees.controller');

router.get('/search', search);
router.get('/profile/:id', profile);
router.get('/dashboard', auth, requireRole('EMPLOYEE'), dashboard);

module.exports = router;
