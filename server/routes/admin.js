const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

router.post('/login', async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.sendStatus(401);

  const ok = await bcrypt.compare(req.body.password, admin.password);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign({ role: 'ADMIN' }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
