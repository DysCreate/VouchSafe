const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  employerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'User' },
  service: { type: String, required: true },
  status: { type: String, enum: ['REQUESTED', 'ACCEPTED', 'COMPLETED', 'REJECTED'], default: 'REQUESTED' },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('Job', jobSchema);
