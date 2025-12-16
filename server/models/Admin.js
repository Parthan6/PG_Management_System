const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
username: { type: String, unique: true },
password: String
});


AdminSchema.pre('save', async function () {
this.password = await bcrypt.hash(this.password, 10);
});


module.exports = mongoose.model('Admin', AdminSchema);