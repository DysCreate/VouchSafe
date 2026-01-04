const EmployeeProfile = require('../models/EmployeeProfile');
const User = require('../models/User');
const Job = require('../models/Job');
const Vouch = require('../models/Vouch');
const DisasterState = require('../models/DisasterState');

async function search(req, res) {
  const { skill, designation, minTrust } = req.query;
  const min = Number(minTrust) || 0;
  try {
    const query = { trustScore: { $gte: min } };
    if (skill) query.skills = { $in: [skill] };
    if (designation) query.designation = new RegExp(designation, 'i');
    const profiles = await EmployeeProfile.find(query).sort({ trustScore: -1 }).limit(50).populate('userId', 'name location');
    
    // Add vouch count to each profile
    const profilesWithVouches = await Promise.all(
      profiles.map(async (profile) => {
        const vouchCount = await Vouch.countDocuments({ toEmployeeId: profile.userId._id });
        return { ...profile.toObject(), vouchCount };
      })
    );
    
    res.json(profilesWithVouches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function profile(req, res) {
  try {
    const id = req.params.id;
    const profile = await EmployeeProfile.findOne({ userId: id }).populate('userId', '-password');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    const vouches = await Vouch.find({ toEmployeeId: id })
      .populate('fromUserId', 'name')
      .populate('jobId', 'service')
      .sort({ createdAt: -1 });
    res.json({ ...profile.toObject(), vouches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function dashboard(req, res) {
  try {
    const userId = req.user._id;
    const incoming = await Job.find({ employeeId: userId }).populate('employerId', 'name phone email');
    const profile = await EmployeeProfile.findOne({ userId });
    res.json({ incoming, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Volunteer as Community Hero
async function volunteerAsHero(req, res) {
  try {
    const userId = req.user._id;
    
    // Check if Community Hero mode is active
    const disasterState = await DisasterState.findOne();
    if (!disasterState || !disasterState.isCommunityHeroActive) {
      return res.status(403).json({ message: 'Community Hero mode is not active' });
    }
    
    // Find or create employee profile
    let profile = await EmployeeProfile.findOne({ userId });
    if (!profile) {
      profile = await EmployeeProfile.create({ userId, designation: '' });
    }
    
    profile.isCommunityHero = true;
    profile.communityHeroSince = new Date();
    await profile.save();
    
    console.log(`Employee ${userId} volunteered as Community Hero`);
    
    res.json({ 
      message: 'Successfully volunteered as Community Hero',
      profile 
    });
  } catch (error) {
    console.error('Volunteer as hero error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Withdraw from Community Hero
async function withdrawFromHero(req, res) {
  try {
    const userId = req.user._id;
    
    // Find or create employee profile
    let profile = await EmployeeProfile.findOne({ userId });
    if (!profile) {
      profile = await EmployeeProfile.create({ userId, designation: '' });
    }
    
    profile.isCommunityHero = false;
    profile.communityHeroSince = null;
    await profile.save();
    
    console.log(`Employee ${userId} withdrew from Community Hero`);
    
    res.json({ 
      message: 'Successfully withdrew from Community Hero program',
      profile 
    });
  } catch (error) {
    console.error('Withdraw from hero error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { search, profile, dashboard, volunteerAsHero, withdrawFromHero };
