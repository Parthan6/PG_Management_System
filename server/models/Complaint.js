const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Complaint',
  new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    title: String,
    description: String,
    status: { type: String, default: 'OPEN' }
  })
);
