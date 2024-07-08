const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://tiak:mongodb.ak17@mycertificatescluster.nvq5wun.mongodb.net/?retryWrites=true&w=majority&appName=MyCertificatesCluster/certificates';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define Schema
const certificateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String
});

// Define Model
const Certificate = mongoose.model('certificate', certificateSchema);

// Endpoint to fetch certificates
app.get('/certificates', (req, res) => {
  Certificate.find()
    .then(certificates => res.json(certificates))
    .catch(err => res.status(500).send(err));
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
