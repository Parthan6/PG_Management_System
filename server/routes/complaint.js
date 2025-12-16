const router = require('express').Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

router.post('/add', auth('TENANT'), async (req, res) => {
  await Complaint.create({ ...req.body, tenantId: req.user.id });
  res.json({ ok: true });
});

router.get('/all', auth('ADMIN'), async (req, res) => {
  res.json(await Complaint.find().populate('tenantId'));
});

module.exports = router;
