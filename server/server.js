const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

connectDB();

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/tenant', require('./routes/tenantRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/complaint', require('./routes/complaintRoutes'));



app.listen(process.env.PORT, () => console.log("Server running"));
