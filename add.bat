
mongo "mongodb+srv://tiak:mongodb.ak17@mycertificatescluster.nvq5wun.mongodb.net/?retryWrites=true&w=majority&appName=MyCertificatesCluster/certificates"
use certificates
db.certificates.insertOne({
  title: 'Certificate of Achievement',
  description: 'Awarded for outstanding performance.',
  imageUrl: 'https://raw.githubusercontent.com/Anupam1707/docs/main/DSPy.png'
});
