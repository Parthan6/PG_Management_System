const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
title: String,
description: String,
status: { type: String, enum: ['OPEN', 'RESOLVED'], default: 'OPEN' },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Complaint', ComplaintSchema);