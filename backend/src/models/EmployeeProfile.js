const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  designation: { type: String, default: '' },
  skills: { type: [String], default: [] },
  trustScore: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  lastActiveAt: { type: Date, default: Date.now },
  isCommunityHero: { type: Boolean, default: false },
  communityHeroSince: { type: Date, default: null },
  hourlyWage: { type: Number, default: null },
  currency: { type: String, default: 'INR' }
});

module.exports = mongoose.model('EmployeeProfile', employeeProfileSchema);
