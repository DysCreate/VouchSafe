const Job = require('../models/Job');
const User = require('../models/User');

async function dashboard(req, res) {
  try {
    const employerId = req.user._id;
    const sent = await Job.find({ employerId }).populate('employeeId', 'name phone email');
    res.json({ sent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function jobRequest(req, res) {
  try {
    const { employeeId, service } = req.body;
    if (!employeeId || !service) return res.status(400).json({ message: 'Missing fields' });
    const job = await Job.create({ employerId: req.user._id, employeeId, service, status: 'REQUESTED' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { dashboard, jobRequest };
