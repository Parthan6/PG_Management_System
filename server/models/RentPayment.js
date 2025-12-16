const mongoose = require('mongoose');

const RentPaymentSchema = new mongoose.Schema({
tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
month: { type: String, required: true }, // YYYY-MM
status: { type: String, enum: ['PAID', 'UNPAID'], default: 'UNPAID' },
paidDate: { type: Date }
});


module.exports = mongoose.model('RentPayment', RentPaymentSchema);