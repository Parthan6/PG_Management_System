const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Tenant = require('../models/Tenant');
const auth = require('../middleware/auth');

router.post('/add', auth('ADMIN'), async (req, res) => {
  const pass = Math.random().toString(36).slice(-8);
  const tenant = await Tenant.create({ ...req.body, password: pass });
  res.json({ tenant, password: pass });
});

router.get('/all', auth('ADMIN'), async (req, res) => {
  res.json(await Tenant.find());
});

router.post('/login', async (req, res) => {
  const t = await Tenant.findOne({ roomNo: req.body.roomNo });
  if (!t) return res.sendStatus(401);

  const ok = await bcrypt.compare(req.body.password, t.password);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign({ role: 'TENANT', id: t._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
