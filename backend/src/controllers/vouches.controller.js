const Vouch = require('../models/Vouch');
const { calculateTrustScore } = require('../services/trust.service');

async function createVouch(req, res) {
  try {
    const { toEmployeeId, jobId, rating } = req.body;
    if (!toEmployeeId || !rating) return res.status(400).json({ message: 'Missing fields' });
    const vouch = await Vouch.create({ fromUserId: req.user._id, toEmployeeId, jobId, rating });
    // update trust
    await calculateTrustScore(toEmployeeId);
    res.json(vouch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createVouch };
