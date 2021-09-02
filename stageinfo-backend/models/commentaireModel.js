const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modèle pour le commentaire d'un stage
const commentaireSchema = Schema({
  idUser: {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  dateCommentaire: {
    type : Date,
    default: new Date()
  },
  message: {
    type : String,
  },
});

module.exports = mongoose.model('Commentaire', commentaireSchema);