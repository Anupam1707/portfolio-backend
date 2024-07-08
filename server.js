const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://tiak:mongodb.ak17@mycertificatescluster.nvq5wun.mongodb.net/?retryWrites=true&w=majority&appName=MyCertificatesCluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const certificateSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});

const Certificate = mongoose.model('Certificate', certificateSchema);

app.get('/certificates', async (req, res) => {
    const certificates = await Certificate.find();
    res.json(certificates);
});

app.post('/certificates', async (req, res) => {
    const newCertificate = new Certificate(req.body);
    await newCertificate.save();
    res.json(newCertificate);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
