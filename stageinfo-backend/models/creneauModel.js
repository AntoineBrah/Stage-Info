const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creneauSchema = Schema({
    dateDeb: Date, 
    heureDeb: Number,  
    dispo: Boolean,  
    commentaire: String,

    idSalle: Schema.Types.ObjectId, //id de la salle
  },
  {
    collection: 'Creneau'
  });

module.exports = mongoose.model('Creneau', creneauSchema);