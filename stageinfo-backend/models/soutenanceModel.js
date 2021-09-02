const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soutenanceSchema = Schema({
    titre: String,
    etudiant: String,           // nom de l'étudiant
    tuteurUniv: String,         // nom du tuteur de l'université
    tuteurEntreprise: String,   // nom du tuteur de l'entreprise
    rapporteur: String, 	    // nom du rapporteur
    entreprise: String,         // nom entreprise	
    commentaire: String,        // il faudrait aussi qu'il y ai l'id de celui qui a poster le commentaire
    session: Number,            // session 1 ou 2
    date: Date,

    modifications:{
        date: Date,
        idUser: Schema.Types.ObjectId,
        motif: String,                  // le motif sera générer automatiquement lors de la modification de la soutenance
    },
    
    idStage: Schema.Types.ObjectId,
    idSalle: Schema.Types.ObjectId,
    idCreneau: Schema.Types.ObjectId,
  },
  {
    collection: 'Soutenance'
  });

module.exports = mongoose.model('Soutenance', soutenanceSchema);