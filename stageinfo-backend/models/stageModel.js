const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Modèle de la fiche de suivi
const ficheSuiviSchema = Schema({
  dateDebut: Date,
  dateFin: Date,
  commentaireBilan: String,
  embauche: String,
  commentaireEmbauche : String,
  dateFiche : Date,
});

// Modèle de la fiche de suivi


const visiteStageSchema = Schema({
  typeContact: String,
  dateVisite: Date,
  commentaire: String
});




const stageSchema = Schema({

    etat: { type: String, default:'propose'},

    titre: { type: String, required: true},
    description: String,
    duree: { type: String, required: true},
    
    dateDebut: String, // début du stage
    datePropose: {type: Date, default: new Date()}, // date de la saisie du stage
    dateValide : Date, // date de la validation du stage, sert a quoi ?

    rapport: String, // c'est quoi ?
    fichier: [{   type: Schema.Types.ObjectId, ref: 'PieceJointe' }], // c'est quoi ?
    resume : String, // c'est quoi ? resume de quoi

    niveauRequis : String, // M1, M2...
    conditions: String,
    objectifs: String,
    competences: String,

    salaire: String,
    avantages: String,


    commentaires : [{   type: Schema.Types.ObjectId, ref: 'Commentaire' }],
    ficheSuivi: {       type: Schema.Types.ObjectId, ref: 'FicheSuivi' },
    noteStage: {        type: Schema.Types.ObjectId, ref: 'noteStage' },
    visiteStage: {      type: Schema.Types.ObjectId, ref: 'VisiteStage' },

    parcours: {         type: Schema.Types.ObjectId, required: true, ref: 'Parcours' },
    entreprise: {       type: Schema.Types.ObjectId, required: true, ref: 'Entreprise' },

    
    ajouteur: {         type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Personne qui ajoute le stage
    repEntreprise: { type: Schema.Types.ObjectId, ref: 'User' }, // représentant entreprise 
    tuteur: {       type: Schema.Types.ObjectId, ref: 'User' }, // Tuteur du stage
    rapporteur: {       type: Schema.Types.ObjectId, ref: 'User' }, // rapporteur du stage
    etudiant: {         type: Schema.Types.ObjectId, ref: 'User' }, // étudiant affecté au stage

  },
  {
    collection: 'Stage'
  });
  
  

module.exports = mongoose.model('FicheSuivi', ficheSuiviSchema);

module.exports = mongoose.model('VisiteStage', visiteStageSchema);

module.exports = mongoose.model('Stage', stageSchema);
