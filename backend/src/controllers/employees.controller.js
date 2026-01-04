const EmployeeProfile = require('../models/EmployeeProfile');
const User = require('../models/User');
const Job = require('../models/Job');
const Vouch = require('../models/Vouch');

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

module.exports = { search, profile, dashboard };
