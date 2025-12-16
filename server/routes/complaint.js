const router = require('express').Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

router.post('/add', auth('TENANT'), async (req, res) => {
  await Complaint.create({ ...req.body, tenantId: req.user.id });
  res.json({ ok: true });
});

router.get('/all', async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('tenantId', 'name roomNo contact')
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', auth(['TENANT']), async (req, res) => {
  const complaints = await Complaint
    .find({ tenantId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(complaints);
});


// RESOLVE complaint
router.put('/resolve/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status: 'RESOLVED' },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint resolved successfully',
      complaint
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
