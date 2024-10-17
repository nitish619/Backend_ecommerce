const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const comicBookRoutes = require('./routes/comicBookRoutes.js')
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); 

app.use('/api/comicbooks', comicBookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
