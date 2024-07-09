const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// URIs for the different databases
const certificatesMongoURI = 'mongodb+srv://tiak:mongodb.ak17@portfolio-dataset.ha4l0ka.mongodb.net/certificates';
const projectsMongoURI = 'mongodb+srv://tiak:mongodb.ak17@portfolio-dataset.ha4l0ka.mongodb.net/projects';

app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// Connect to MongoDB for certificates
const certificatesConnection = mongoose.createConnection(certificatesMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

certificatesConnection.on('connected', () => {
  console.log('MongoDB Connected to certificates database');
});

certificatesConnection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1); // Exit process with failure
});

// Connect to MongoDB for projects
const projectsConnection = mongoose.createConnection(projectsMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

projectsConnection.on('connected', () => {
  console.log('MongoDB Connected to projects database');
});

projectsConnection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1); // Exit process with failure
});

// Define Schema
const certificateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String
});

// Define Models for both databases
const Certificate = certificatesConnection.model('Certificate', certificateSchema);
const Project = projectsConnection.model('Project', certificateSchema);

// Endpoint to fetch certificates
app.get('/certificates', (req, res) => {
  Certificate.find()
    .then(certificates => res.json(certificates))
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching certificates');
    });
});

// Endpoint to fetch projects
app.get('/projects', (req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching projects');
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
