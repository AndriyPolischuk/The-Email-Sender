const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const clientsSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  telephone: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  comment: {
    type: String,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Clients', clientsSchema);
