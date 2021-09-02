const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrepriseSchema = Schema({
    nom: String,
    siteweb: String,
    description: String,
    siret: String,
    tel: String,
    fax: String,
/*
    adresse: new mongoose.Schema({ // la table pgs_adresse directement dans entreprise
      voie: String,
      ville: String,
      codePostal: String,
      complement: String,
    }),
    */
    voie: String,
    ville: String,
    codePostal: String,
    pays: String,

    representant: { type: Schema.Types.ObjectId, ref: 'User'},  // id responsable administrateur je crois

    secteurActivite: String,
    nbSalaries: Number,
    local: Boolean,             // true si l'entreprise possède un local, false sinon
    chiffreAffaire: String,     // chiffre affaire de l'entreprise mais de quand ???
  },
  {
    collection: 'Entreprise'
  });

module.exports = mongoose.model('Entreprise', entrepriseSchema);