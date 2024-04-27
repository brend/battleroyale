// Main server setup
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/dbConnect');
const userRoutes = require('./routes/userRoutes');
const gameoflifeRoutes = require('./routes/gameoflifeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/gameoflife', gameoflifeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));