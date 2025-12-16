const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');


router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // check existing admin
    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // create admin (password will be hashed by pre-save hook)
    const admin = new Admin({ username, password });
    await admin.save();

    // generate token
    const token = jwt.sign(
      { id: admin._id, role: 'ADMIN' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Admin registered successfully',
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/login', async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.sendStatus(401);

  const ok = await bcrypt.compare(req.body.password, admin.password);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign({ role: 'ADMIN' }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
