const mongoose = require('mongoose');

module.exports = mongoose.model(
  'RentPayment',
  new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    month: String,
    status: { type: String, default: 'PAID' }
  })
);
