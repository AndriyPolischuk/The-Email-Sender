const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const leadsSchema = new mongoose.Schema({
  businessName: {
    type: String,
  },
  website: {
    type: String,
  },
  telephone: {
    type: String,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
  },
  industry: {
    type: String,
  },
  text: {
    type: String,
  },
  delay: {
    type: Number,
  },
  subject: {
    type: String,
  },
  timerReference: {
    type: Object,
  },
  isSent: {
    type: Boolean,
  },
  sentAt: {
    type: Date,
  },
  status: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Leads', leadsSchema);
