const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://tiak:mongodb.ak17@mycertificatescluster.nvq5wun.mongodb.net/mycertificatescluster';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1); // Exit process with failure
});

// Define Schema
const certificateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String
});

// Define Model
const Certificate = mongoose.model('Certificate', certificateSchema);

// Endpoint to fetch certificates
app.get('/certificates', (req, res) => {
  Certificate.find()
    .then(certificates => res.json(certificates))
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching certificates');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
