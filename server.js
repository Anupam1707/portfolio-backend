const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// URIs for the different databases
const certificatesMongoURI = 'mongodb+srv://tiak:mongodb.ak17@portfolio-dataset.ha4l0ka.mongodb.net/certificates';
const projectsMongoURI = 'mongodb+srv://tiak:mongodb.ak17@portfolio-dataset.ha4l0ka.mongodb.net/projects';
const blogsMongoURI = 'mongodb+srv://tiak:mongodb.ak17@portfolio-dataset.ha4l0ka.mongodb.net/blogs';

app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// Connect to MongoDB for certificates
const certificatesConnection = mongoose.createConnection(certificatesMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to MongoDB for projects
const projectsConnection = mongoose.createConnection(projectsMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to MongoDB for blogs
const blogsConnection = mongoose.createConnection(blogsMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Schema
const certificateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String
});

const blogSchema = new mongoose.Schema({
  title: String,
  imageurl: String,
  content: String
});

// Define Models for both databases
const Certificate = certificatesConnection.model('Certificate', certificateSchema);
const Project = projectsConnection.model('Project', certificateSchema);
const Blog = blogsConnection.model('Blog', blogSchema);

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

// Endpoint to fetch all blog titles
app.get('/blogs', (req, res) => {
  Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching blogs');
    });
});

// Endpoint to fetch a specific blog by title
app.get('/blog/:title', (req, res) => {
  Blog.findOne({ title: req.params.title })
    .then(blog => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).send('Blog not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching blog');
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
