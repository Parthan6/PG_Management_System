const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tenant = require('../models/Tenant');

const router = express.Router();

/**
 * TENANT LOGIN
 */
router.post('/login', async (req, res) => {
  const { roomNo, password } = req.body;

  const tenant = await Tenant.findOne({ roomNo });
  if (!tenant) {
    return res.status(400).json({ message: 'Tenant not found' });
  }

  const isMatch = await bcrypt.compare(password, tenant.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: tenant._id, role: 'TENANT' },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    token,
    tenant: {
      id: tenant._id,
      name: tenant.name,
      roomNo: tenant.roomNo
    }
  });
});

module.exports = router;
