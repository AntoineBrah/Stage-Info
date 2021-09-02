const Creneau = require('../models/creneauModel.js');

/**
 * @api {get} /creneau Get all Creneau
 * @apiDescription Récupération de toutes les creneaux
 * @apiName GetAllCreneau
 * @apiGroup Creneau
 */
exports.getAllCreneau = ((req, res, next) => {
    Creneau.find()
    .then(creneaux => res.status(200).json(creneaux))
    .catch(error => res.status(404).json({ error }));
});

/**
 * @api {get} /creneau/:id Get a Creneau
 * @apiName GetOneCreneau
 * @apiGroup Creneau
 *
 * @apiParam {Number} id Creneau's unique ID.
 *
 */
exports.getOneCreneau = ((req, res, next) => {
    Creneau.findOne({
        _id: req.params.id
    })
    .then(creneau => res.status(200).json(creneau))
    .catch(error => res.status(404).json({ error }))
});

/**
 * @api {post} /creneau Create a new Creneau
 * @apiName CreateCreneau
 * @apiGroup Creneau
 */
exports.createCreneau = ((req, res, next) => {
    console.log(req.body);

    // Récupération des inputs utilisateur
    const creneau = new Creneau({
      dateDeb: req.body.dateDeb,
      heureDeb: req.body.heureDeb,
      dispo: req.body.dispo,
      commentaire: req.body.commentaire
    });

    // Envoi dans la bdd
    creneau.save()
        .then(() => res.status(201).json({
            message: 'La Creneau a bien été envoyé'
        }))
        .catch(error => res.status(404).json({error: error}));
});

/**
 * @api {put} /creneau/:id Edit a Creneau
 * @apiName EditCreneau
 * @apiGroup Creneau
 *
 * @apiParam {Number} id Creneau's unique ID.
 */
 exports.editCreneau = ((req, res, next) => {
     console.log(req.body);
     
     const creneau = new Creneau({
        _id: req.params.id,
        dateDeb: req.body.dateDeb,
        heureDeb: req.body.heureDeb,
        dispo: req.body.dispo,
        commentaire: req.body.commentaire
     });

     Creneau.updateOne({_id: req.params.id}, creneau)
        .then(() => {
            res.status(201).json({
                message: 'Creneau updated successfully'
            });
        })
        .catch((error) => {
            res.status(404).json({
                error : error
            });
        });
 });

  /**
 * @api {delete} /creneau Delete a creneau
 * @apiName DeleteOneCreneau
 * 
 * @apiGroup Creneau
 *
 * @apiParam {Number} id Creneau's unique ID.
 */
exports.deleteOneCreneau = ((req, res, next) => {
    Creneau.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({
                message: 'Creneau deleted'
            });
        })
        .catch((error) => {
            res.status(404).json({
                error: error
            });
        });
});


 /**
 * @api {delete} /creneau Delete all Creneau
 * @apiName DeleteAllCreneau
 * 
 * @apiGroup Creneau
 *
 * @apiParam {Number} id Creneau's unique ID.
 */
exports.deleteAllCreneau = ((req, res, next) => {
    Creneau.deleteMany({}).then(() => {
        res.status(200).json({
            message: 'All Creneaux deleted'
        });
    })
    .catch((error) => {
        res.status(404).json({
            error: error
        });
    });
});