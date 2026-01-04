const Vouch = require('../models/Vouch');
const { calculateTrustScore } = require('../services/trust.service');

async function createVouch(req, res) {
  try {
    const { toEmployeeId, jobId, rating, comment } = req.body;
    if (!toEmployeeId || !rating) return res.status(400).json({ message: 'Missing fields' });
    const vouch = await Vouch.create({ fromUserId: req.user._id, toEmployeeId, jobId, rating, comment: comment || '' });
    // update trust
    await calculateTrustScore(toEmployeeId);
    res.json(vouch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getEmployeeVouches(req, res) {
  try {
    const { employeeId } = req.params;
    const vouches = await Vouch.find({ toEmployeeId: employeeId })
      .populate('fromUserId', 'name')
      .populate('jobId', 'service')
      .sort({ createdAt: -1 });
    res.json(vouches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createVouch, getEmployeeVouches };
