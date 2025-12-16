const router = require('express').Router();
const RentPayment = require('../models/RentPayment');
const Tenant = require('../models/Tenant');
const auth = require('../middleware/auth');

router.post('/mark', auth('ADMIN'), async (req, res) => {
  await RentPayment.create(req.body);
  res.json({ ok: true });
});

router.get('/status/:month', auth('ADMIN'), async (req, res) => {
  const tenants = await Tenant.find();
  const paid = await RentPayment.find({ month: req.params.month });

  const paidIds = paid.map(p => p.tenantId.toString());
  res.json({
    paid: tenants.filter(t => paidIds.includes(t._id.toString())),
    unpaid: tenants.filter(t => !paidIds.includes(t._id.toString()))
  });
});

module.exports = router;
