const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Admin authentication
router.post('/login', adminController.login);

// Community Hero mode management
router.post('/community-hero/enable', adminController.enableCommunityHero);
router.post('/community-hero/disable', adminController.disableCommunityHero);
router.get('/disaster-state', adminController.getDisasterState);

module.exports = router;
