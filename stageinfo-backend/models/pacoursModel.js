const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcoursSchema = Schema({
        niveau: String,
        acronyme: String,
        intitule: String,
        description: String,
        existe: Boolean, // si le parcours n'existe plus il ne sera plus proposé mais existera toujours
        responsable: { type: Schema.ObjectId, ref: 'User' }  // id responsable parcours
    },
    {
        collection: 'Parcours'
    });


module.exports = mongoose.model('Parcours', parcoursSchema);
