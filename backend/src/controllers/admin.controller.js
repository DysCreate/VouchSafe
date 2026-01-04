const DisasterState = require('../models/DisasterState');
const EmployeeProfile = require('../models/EmployeeProfile');

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    
    // Return success with admin token (simple hardcoded token for admin)
    res.json({ 
      message: 'Admin login successful',
      data: {
        token: 'admin-session-token',
        isAdmin: true,
        username: ADMIN_USERNAME
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Enable Community Hero mode
exports.enableCommunityHero = async (req, res) => {
  try {
    // Verify admin credentials in request
    const { username, password } = req.body;
    
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Find or create disaster state
    let disasterState = await DisasterState.findOne();
    
    if (!disasterState) {
      disasterState = new DisasterState();
    }
    
    disasterState.isCommunityHeroActive = true;
    disasterState.activatedAt = new Date();
    disasterState.activatedBy = 'admin';
    await disasterState.save();
    
    console.log('Community Hero mode ENABLED by admin');
    
    res.json({ 
      message: 'Community Hero mode enabled',
      data: disasterState 
    });
  } catch (error) {
    console.error('Enable Community Hero error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Disable Community Hero mode
exports.disableCommunityHero = async (req, res) => {
  try {
    // Verify admin credentials
    const { username, password } = req.body;
    
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Update disaster state
    let disasterState = await DisasterState.findOne();
    
    if (!disasterState) {
      disasterState = new DisasterState();
    }
    
    disasterState.isCommunityHeroActive = false;
    disasterState.deactivatedAt = new Date();
    await disasterState.save();
    
    // Reset all Community Hero flags
    await EmployeeProfile.updateMany(
      { isCommunityHero: true },
      { 
        $set: { 
          isCommunityHero: false,
          communityHeroSince: null
        } 
      }
    );
    
    console.log('Community Hero mode DISABLED by admin - All hero flags reset');
    
    res.json({ 
      message: 'Community Hero mode disabled. All hero badges removed.',
      data: disasterState 
    });
  } catch (error) {
    console.error('Disable Community Hero error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current disaster state
exports.getDisasterState = async (req, res) => {
  try {
    let disasterState = await DisasterState.findOne();
    
    if (!disasterState) {
      disasterState = new DisasterState();
      await disasterState.save();
    }
    
    res.json({ 
      message: 'Disaster state retrieved',
      data: disasterState 
    });
  } catch (error) {
    console.error('Get disaster state error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
