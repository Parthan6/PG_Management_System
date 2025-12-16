const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();


router.post('/add', async (req, res) => {
const complaint = await Complaint.create(req.body);
res.json(complaint);
});


router.get('/all', async (req, res) => {
const complaints = await Complaint.find().populate('tenantId');
res.json(complaints);
});



router.put('/resolve/:id', async (req, res) => {
const complaint = await Complaint.findByIdAndUpdate(
req.params.id,
{ status: 'RESOLVED' },
{ new: true }
);
res.json(complaint);
});


module.exports = router;