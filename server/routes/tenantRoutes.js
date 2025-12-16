const express = require('express');
const Tenant = require('../models/Tenant');
const router = express.Router();


router.post('/add', async (req, res) => {
const tenant = await Tenant.create(req.body);
res.json(tenant);
});


router.get('/all', async (req, res) => {
const tenants = await Tenant.find();
res.json(tenants);
});


module.exports = router;