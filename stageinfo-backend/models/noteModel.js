const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteStageSchema = Schema({
    date: Date,
    valeur: String,
    commentaire: String,
},
{
    collection: 'noteStage'
});


module.exports = mongoose.model('noteStage', noteStageSchema);