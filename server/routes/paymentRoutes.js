const express = require('express');
const router = express.Router();

const RentPayment = require('../models/RentPayment');
const Tenant = require('../models/Tenant');

/**
 * MARK PAYMENT (already correct, minor safety improvement)
 */
router.post('/mark', async (req, res) => {
  try {
    const { tenantId, month } = req.body;

    const payment = await RentPayment.findOneAndUpdate(
      { tenantId, month },
      {
        status: 'PAID',
        paidDate: new Date()
      },
      { upsert: true, new: true }
    );

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET PAYMENTS FOR A MONTH (optional list)
 */
router.get('/month/:month', async (req, res) => {
  try {
    const payments = await RentPayment.find({
      month: req.params.month
    }).populate('tenantId');

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET PAID & UNPAID TENANTS FOR A MONTH
 * GET /payment/status/:month
 */
router.get('/status/:month', async (req, res) => {
  try {
    const { month } = req.params;

    // 1. Get all tenants
    const tenants = await Tenant.find();

    // 2. Get PAID payments for the month
    const paidPayments = await RentPayment.find({
      month,
      status: 'PAID'
    });

    // 3. Extract paid tenant IDs
    const paidTenantIds = paidPayments.map(p =>
      p.tenantId.toString()
    );

    // 4. Split tenants
    const paid = tenants.filter(t =>
      paidTenantIds.includes(t._id.toString())
    );

    const unpaid = tenants.filter(t =>
      !paidTenantIds.includes(t._id.toString())
    );

    res.json({ paid, unpaid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
