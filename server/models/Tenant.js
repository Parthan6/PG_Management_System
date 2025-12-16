const mongoose = require('mongoose');


const TenantSchema = new mongoose.Schema({
name: { type: String, required: true },
roomNo: { type: String, required: true },
contact: { type: String, required: true }
});


module.exports = mongoose.model('Tenant', TenantSchema);