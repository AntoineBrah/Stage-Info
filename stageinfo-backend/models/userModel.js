const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = Schema({
    nom : String,
    prenom : String,
    email : {type: String, required: true, unique: true},
    telephone : Number,
    fax : Number,
    hash : String, //password
    role : {type: String, required: true},
    
    //etudiant
    numeroEtudiant : String,
    promotion : String,
    parcours : { type: Schema.ObjectId, ref: 'Parcours' },
    
    // representant_entreprise
    fonctionOccupee : String,
    entreprise : { type: Schema.ObjectId, ref: 'Entreprise' },
  },
  {
    collection: 'User'
  });
  
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
