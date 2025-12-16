const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TenantSchema = new mongoose.Schema({
  name: String,
  roomNo: String,
  contact: String,
  password: String
});

TenantSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('Tenant', TenantSchema);
