const Salle = require('../models/salleModel');

/**
 * @api {get} /salle Get all Salle
 * @apiDescription Récupération de toutes les salles
 * @apiName GetAllSalle
 * @apiGroup Salle
 */
exports.getAllSalle = ((req, res, next) => {
    Salle.find()
    .then(salles => res.status(200).json(salles))
    .catch(error => res.status(400).json({ error }));
});

/**
 * @api {get} /salle/:id Get a Salle
 * @apiName GetOneSalle
 * @apiGroup Salle
 *
 * @apiParam {Number} id Salle's unique ID.
 *
 */
exports.getOneSalle = ((req, res, next) => {
    Salle.findOne({
        _id: req.params.id
    })
    .then(salle => res.status(200).json(salle))
    .catch(error => res.status(404).json({ error }))
});

/**
 * @api {post} /salle Create a new Salle
 * @apiName CreateSalle
 * @apiGroup Salle
 */
exports.createSalle = ((req, res, next) => {
    console.log(req.body);

    // Récupération des inputs utilisateur
    const salle = new Salle({
      nom: req.body.nom,
      batiment: req.body.batiment,
      capacite: req.body.capacite,
      commentaire: req.body.commentaire
    });

    // Envoi dans la bdd
    salle.save()
        .then(() => res.status(201).json({
            message: 'La Salle a bien été envoyé'
        }))
        .catch(error => res.status(400).json({error: error}));
});

/**
 * @api {put} /salle/:id Edit a Salle
 * @apiName EditSalle
 * @apiGroup Salle
 *
 * @apiParam {Number} id Salle's unique ID.
 */
 exports.editSalle = ((req, res, next) => {
     console.log(req.body);
     
     const salle = new Salle({
        _id: req.params.id,
        nom: req.body.nom,
        batiment: req.body.batiment,
        capacite: req.body.capacite,
        commentaire: req.body.commentaire
     });

     Salle.updateOne({_id: req.params.id}, salle)
        .then(() => {
            res.status(201).json({
                message: 'Salle updated successfully'
            });
        })
        .catch((error) => {
            res.status(400).json({
                error : error
            });
        });
 });

 /**
 * @api {delete} /salle Delete a salle
 * @apiName DeleteOneSalle
 * 
 * @apiGroup Salle
 *
 * @apiParam {Number} id Salle's unique ID.
 */
exports.deleteOneSalle = ((req, res, next) => {
    Salle.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({
                message: 'Salle deleted'
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });
});


 /**
 * @api {delete} /salle Delete all Salle
 * @apiName DeleteAllSalle
 * 
 * @apiGroup Salle
 *
 * @apiParam {Number} id Salle's unique ID.
 */
exports.deleteAllSalle = ((req, res, next) => {
    Salle.deleteMany({}).then(() => {
        res.status(200).json({
            message: 'All Salles deleted'
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});