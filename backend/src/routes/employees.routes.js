const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');
const { search, profile, dashboard, volunteerAsHero, withdrawFromHero } = require('../controllers/employees.controller');

router.get('/search', search);
router.get('/profile/:id', profile);
router.get('/dashboard', auth, requireRole('EMPLOYEE'), dashboard);

// Community Hero routes
router.post('/community-hero/volunteer', auth, requireRole('EMPLOYEE'), volunteerAsHero);
router.post('/community-hero/withdraw', auth, requireRole('EMPLOYEE'), withdrawFromHero);

module.exports = router;
