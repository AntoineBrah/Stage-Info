const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const embaucheSchema = Schema({
    idStage: Schema.Types.ObjectId,  
    idEtudiant: Schema.Types.ObjectId,
    idEntreprise: Schema.Types.ObjectId,
    
    Commentaire: String,
    contratType: String,
    dateEmbauche: Date,
  },
  {
    collection: 'Embauche'
  });

module.exports = mongoose.model('Embauche', embaucheSchema);