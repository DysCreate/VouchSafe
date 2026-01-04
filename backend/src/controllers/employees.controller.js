const EmployeeProfile = require('../models/EmployeeProfile');
const User = require('../models/User');
const Job = require('../models/Job');

async function search(req, res) {
  const { skill, designation, minTrust } = req.query;
  const min = Number(minTrust) || 0;
  try {
    const query = { trustScore: { $gte: min } };
    if (skill) query.skills = { $in: [skill] };
    if (designation) query.designation = new RegExp(designation, 'i');
    const profiles = await EmployeeProfile.find(query).sort({ trustScore: -1 }).limit(50).populate('userId', 'name location');
    res.json(profiles);
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
    res.json(profile);
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
