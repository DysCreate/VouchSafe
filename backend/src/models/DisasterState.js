const mongoose = require('mongoose');

const disasterStateSchema = new mongoose.Schema({
  isCommunityHeroActive: {
    type: Boolean,
    default: false
  },
  activatedAt: {
    type: Date,
    default: null
  },
  deactivatedAt: {
    type: Date,
    default: null
  },
  activatedBy: {
    type: String,
    default: 'admin'
  }
});

module.exports = mongoose.model('DisasterState', disasterStateSchema);
