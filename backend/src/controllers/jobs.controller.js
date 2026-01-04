const Job = require('../models/Job');
const EmployeeProfile = require('../models/EmployeeProfile');
const { calculateTrustScore } = require('../services/trust.service');

async function accept(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (String(job.employeeId) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
    job.status = 'ACCEPTED';
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function reject(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (String(job.employeeId) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
    job.status = 'REJECTED';
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function complete(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    // Only employer or assigned employee can mark complete
    if (String(req.user._id) !== String(job.employerId) && String(req.user._id) !== String(job.employeeId)) return res.status(403).json({ message: 'Not allowed' });
    job.status = 'COMPLETED';
    job.completedAt = new Date();
    await job.save();

    // increment employee profile completedJobs
    if (job.employeeId) {
      const profile = await EmployeeProfile.findOne({ userId: job.employeeId });
      if (profile) {
        profile.completedJobs = (profile.completedJobs || 0) + 1;
        profile.lastActiveAt = new Date();
        await profile.save();
        await calculateTrustScore(job.employeeId);
      }
    }

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { accept, reject, complete };
