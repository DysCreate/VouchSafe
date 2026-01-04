const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  designation: { type: String, default: '' },
  skills: { type: [String], default: [] },
  trustScore: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  lastActiveAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmployeeProfile', employeeProfileSchema);
