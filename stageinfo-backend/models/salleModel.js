const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salleSchema = Schema({
    nom: String,
    batiment: String,
    capacite: Number,
    commentaire: String, 
  },
  {
    collection: 'Salle'
  });

module.exports = mongoose.model('Salle', salleSchema);