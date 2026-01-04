const EmployeeProfile = require('../models/EmployeeProfile');
const Vouch = require('../models/Vouch');
const Job = require('../models/Job');
const TrustLog = require('../models/TrustLog');

async function calculateTrustScore(employeeUserId) {
  const profile = await EmployeeProfile.findOne({ userId: employeeUserId });
  if (!profile) return null;

  const completedJobs = profile.completedJobs || 0;
  const base = completedJobs * 10; // base weight

  const vouches = await Vouch.find({ toEmployeeId: employeeUserId });
  const vouchCount = vouches.length;
  const vouchAvg = vouchCount ? vouches.reduce((s, v) => s + v.rating, 0) / vouchCount : 0;
  const vouchWeight = vouchAvg * 5; // up to 25

  const rejectedCount = await Job.countDocuments({ employeeId: employeeUserId, status: 'REJECTED' });
  const penalty = rejectedCount * 5;

  // inactivity decay: 10% reduction per 30 days of inactivity beyond 30 days
  let decayFactor = 1;
  if (profile.lastActiveAt) {
    const days = (Date.now() - new Date(profile.lastActiveAt)) / (1000 * 60 * 60 * 24);
    if (days > 30) decayFactor = Math.max(0.3, 1 - 0.1 * Math.floor((days - 30) / 30));
  }

  let newScore = Math.max(0, Math.round((base + vouchWeight - penalty) * decayFactor));

  const previous = profile.trustScore || 0;
  profile.trustScore = newScore;
  await profile.save();

  await TrustLog.create({ employeeId: employeeUserId, previousScore: previous, newScore, reason: 'recalc' });

  return newScore;
}

module.exports = { calculateTrustScore };
