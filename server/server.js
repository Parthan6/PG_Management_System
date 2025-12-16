const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', require('./routes/admin'));
app.use('/api/tenant', require('./routes/tenant'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/complaint', require('./routes/complaint'));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log('Server running on 5000'));
});
