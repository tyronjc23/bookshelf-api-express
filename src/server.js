require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;
const BookRoutes = require('./Routes/BookRoutes');

app.use(express.json());
app.use('/books', BookRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
