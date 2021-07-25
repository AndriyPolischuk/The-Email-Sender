const mongoose = require('mongoose');

const leadsCountSchema = new mongoose.Schema({
  leadsNumber: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LeadsCount', leadsCountSchema);
