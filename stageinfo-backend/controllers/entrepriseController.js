const Entreprise = require('../models/entrepriseModel');



/**----------------------AFFICHAGE--ENTREPRISE-------------------**/

exports.getAllEntreprise = (req, res, next) => {
    Entreprise.find()
        .populate('representant', 'nom prenom')
        .then(entreprise => res.status(200).json(entreprise))
        .catch(error =>res.status(404).json({error}));
}

exports.getOneEntreprise = (req,res, next) => {
    Entreprise.findOne({_id: req.params.id})
        .populate('representant', 'nom prenom')
        .then(entreprise => res.status(200).json(entreprise))
        .catch(error => res.status(404).json(error));
};

/**--------------------------MODIFICATION--ENTREPRISE-----------------**/

exports.editEntreprise = (req, res, next) => {
    const entreprise = new Entreprise ({
        _id: req.params.id,
        ...req.body
    });
    Entreprise.updateOne({_id: req.params.id}, entreprise)
        .then(() => {
        res.status(201).json({
            message: 'Entreprise updated successfully!'
        });
    })
    .catch((error) => { res.status(400).json({ error: error});});
};

/**-------------------CREATION-ENTREPRISE-----------------------**/

/**
 * @api {post} /entreprise Create a new Entreprise
 * @apiName createEntreprise
 * @apiGroup Entreprise
 */
exports.createEntreprise = (req, res, next) => {
    console.log(req.body);

    const entreprise = new Entreprise({
        nom: req.body.nom,
        secteurActivite: req.body.secteurActivite,
        description: req.body.description,
        voie: req.body.voie,
        codePostal: req.body.codePostal,
        ville: req.body.ville,
        siteweb: req.body.siteweb,
        tel: req.body.tel,
        fax: req.body.fax,
        siret: req.body.siret,
        nbSalaries: req.body.nbSalaries,
        local: req.body.local,
        chiffreAffaire: req.body.chiffreAffaire,
        representant: req.body.representant
    });
    console.log(req.body);

    entreprise.save()
        .then(() => {
            res.status(201).json({
                message: 'Post saved successfully!',
                idEntreprise: entreprise._id
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};
/**-----------------SUPPRESSION---ENTREPRISE-------------------**/

exports.deleteOneEntreprise = (req, res, next) => {
  Entreprise.deleteOne({_id: req.params.id})
      .then(() => {
      res.status(200).json({
          message: 'Entreprise DELETED!'
      });
  })
      .catch((error) => { res.status(400).json({ error: error});});
};
exports.deleteAllEntreprise = (req,res,next) => {
    Entreprise.deleteMany({})
        .then(() => {
        res.status(200).json({
            message: 'All Entreprises DELETED!'
        });
    })
        .catch((error) => { res.status(400).json({ error: error});});
};
