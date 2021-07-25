const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const projectsSchema = new mongoose.Schema({
  clientId: {
    type: ObjectId,
    ref: 'Clients',
    required: true,
  },
  projectName: {
    type: String,
  },
  industry: {
    type: String,
  },
  status: {
    type: String,
    default: 'processed',
  },
  appType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Projects', projectsSchema);
