// Main server setup
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const connectDB = require('./database/dbConnect');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));