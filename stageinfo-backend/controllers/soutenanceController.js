const Soutenance = require('../models/soutenanceModel');

/**
 * @api {get} /soutenance Get all Soutenance
 * @apiDescription Récupération de toutes les soutenances
 * @apiName GetAllSoutenance
 * @apiGroup Soutenance
 */
exports.getAllSoutenance = ((req, res, next) => {
    Soutenance.find()
    .then(soutenances => res.status(200).json(soutenances))
    .catch(error => res.status(400).json({ error }));
});

/**
 * @api {get} /soutenance/:id Get a Soutenance
 * @apiName GetOneSoutenance
 * @apiGroup Soutenance
 *
 * @apiParam {Number} id Soutenance's unique ID.
 *
 */
exports.getOneSoutenance = ((req, res, next) => {
    Soutenance.findOne({
        _id: req.params.id
    })
    .then(soutenance => res.status(200).json(soutenance))
    .catch(error => res.status(404).json({ error }))
});

/**
 * @api {post} /soutenance Create a new Soutenance
 * @apiName CreateSoutenance
 * @apiGroup Soutenance
 */
exports.createSoutenance = ((req, res, next) => {
    console.log(req.body);

    // Récupération des inputs utilisateur
    const soutenance = new Soutenance({
      titre: req.body.titre,
      etudiant: req.body.etudiant,
      tuteurUniv: req.body.tuteurUniv,
      tuteurEntreprise: req.body.tuteurEntreprise,
      rapporteur: req.body.rapporteur,
      entreprise: req.body.entreprise,
      commentaire: req.body.commentaire,
      session: req.body.session,

      idStage: req.body.idStage,
      idCreneau: req.body.idCreneau
    });

    // Envoi dans la bdd
    soutenance.save()
        .then(() => res.status(201).json({
            message: 'La Soutenance a bien été envoyé'
        }))
        .catch(error => res.status(400).json({error: error}));
});

/**
 * @api {put} /soutenance/:id Edit a Soutenance
 * @apiName EditSoutenance
 * @apiGroup Soutenance
 *
 * @apiParam {Number} id Soutenance's unique ID.
 */
 exports.editSoutenance = ((req, res, next) => {
     console.log(req.body);
     
     const soutenance = new Soutenance({
        _id: req.params.id,
        titre: req.body.titre,
        etudiant: req.body.etudiant,
        tuteurUniv: req.body.tuteurUniv,
        tuteurEntreprise: req.body.tuteurEntreprise,
        rapporteur: req.body.rapporteur,
        entreprise: req.body.entreprise,
        commentaire: req.body.commentaire,
        session: req.body.session,
        modifications : {
            date: new Date(),
            idUser: req.body.idUser, // id de l'utilisateur qui effectue la modification
            motif: req.body.motif
        },
        idStage: req.body.idStage,
        idCreneau: req.body.idCreneau
     });


     Soutenance.updateOne({_id: req.params.id}, soutenance)
        .then(() => {
            res.status(201).json({
                message: 'Soutenance updated successfully'
            });
        })
        .catch((error) => {
            res.status(400).json({
                error : error
            });
        });
 });

 /**
 * @api {delete} /soutenance Delete a soutenance
 * @apiName DeleteOneSoutenance
 * 
 * @apiGroup Soutenance
 *
 * @apiParam {Number} id Soutenance's unique ID.
 */
exports.deleteOneSoutenance = ((req, res, next) => {
    Soutenance.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({
                message: 'Soutenance deleted'
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });
});


 /**
 * @api {delete} /soutenance Delete all Soutenance
 * @apiName DeleteAllSoutenance
 * 
 * @apiGroup Soutenance
 *
 * @apiParam {Number} id Soutenance's unique ID.
 */
exports.deleteAllSoutenance = ((req, res, next) => {
    Soutenance.deleteMany({}).then(() => {
        res.status(200).json({
            message: 'All Soutenances deleted'
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});