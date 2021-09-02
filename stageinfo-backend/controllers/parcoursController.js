const Parcours = require('../models/pacoursModel');

/**
 * @api {get} /Parcours Get all Parcours
 * @apiName GetAllParcours
 * @apiGroup Parcours
 */
exports.getAllParcours = ((req, res, next) => {
    Parcours.find()
        .populate('responsable', 'nom prenom')
        .then(Parcours => res.status(200).json(Parcours))
        .catch(error => res.status(404).json({ error }));
});

/**
 * @api {get} /Parcours/:id Get a Parcours
 * @apiName GetOneParcours
 * @apiGroup Parcours
 *
 * @apiParam {Number} id Stage's unique ID.
 *
 */
exports.getOneParcours = ((req, res, next) => {
    console.log(req.params.id);
    Parcours.findOne({
        _id: req.params.id
    })
        .populate('responsable', 'nom prenom')
        .then(parcours => res.status(200).json(parcours))
        .catch(error => res.status(404).json({ error}))

});

/**
 * @api {post} /stage Create a new Stage
 * @apiName CreateStage
 * @apiGroup Stage
 */
exports.createParcours = (req, res, next) => {
    console.log(req.body);

    const parcours = new Parcours({
        niveau: req.body.niveau,
        acronyme: req.body.acronyme,
        intitule: req.body.intitule,
        description: req.body.description,
        existe: req.body.existe,
        responsable: req.body.responsable,
    });

    parcours.save()
        .then(() => {
            res.status(201).json({
                message: 'Post saved successfully!',
                idParcours: parcours._id
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};

/**
 * @api {put} /Parcours/:id Edit a Parcours
 * @apiName EditParcours
 * @apiGroup Parcours
 *
 * @apiParam {Number} id Parcours's unique ID.
 */
exports.editParcours = (req, res, next) => {
    console.log(req.body);

    const parcours = new Parcours({
        _id: req.params.id,
        acronyme : req.body.acronyme,
        intitule : req.body.intitule,
        niveau : req.body.niveau,
        description : req.body.description,
        existe: req.body.existe,
        responsable: req.body.responsable,
    });

    Parcours.updateOne({_id: req.params.id}, parcours)
        .then(() => {
            res.status(201).json({
                message: 'Parcours updated successfully!'
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};

/**
 * @api {delete} /Parcours Delete a stage
 * @apiName DeleteOneParcours
 *
 * @apiGroup Parcours
 *
 * @apiParam {Number} id Parcour unique ID.
 */
exports.deleteOneParcours = (req, res, next) => {
    Parcours.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Parcours deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

