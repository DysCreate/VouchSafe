const mongoose = require('mongoose');
const { Schema } = mongoose;

const trustLogSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  previousScore: { type: Number },
  newScore: { type: Number },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrustLog', trustLogSchema);
