const Stage = require('../models/stageModel');
const Commentaire = require('../models/commentaireModel');
const PJ = require('../models/pieceJointeModel')
const note = require('../models/noteModel')
const fs = require('fs');
const multer =require('../middleware/multer-config')

/**
 * @api {get} /stage Get all Stages
 * @apiName GetAllStage
 * @apiGroup Stage
 */
exports.getAllStage = ((req, res, next) => {
  Stage.find()
  .populate('commentaires')
  .populate('entreprise','nom')
  .populate('parcours', 'acronyme')
  .populate('ajouteur', 'nom prenom')
  .populate('repEntreprise', 'nom prenom')
  .populate('tuteur', 'nom prenom')
  .populate('rapporteur', 'nom prenom')
  .populate('noteStage', 'valeur commentaire')
  .populate('etudiant', 'nom prenom numeroEtudiant')
  .then(stages => res.status(200).json(stages))
  .catch(error => res.status(404).json({ error }));
});



exports.getAllStageRelatedToUser = ((req, res, next) => {
    Stage.find({
        $or:[ 
            {'ajouteur':req.params.id}, 
            {'etudiant':req.params.id},
            {'tuteur':req.params.id}, 
            {'rapporteur':req.params.id},
        ]})
    .populate('commentaires')
    .populate('ficheSuivi')
    .populate('noteStage')
    .populate('visiteStage')
    .populate('fichier')
    .populate('entreprise')
    .populate('parcours', 'acronyme')
  
  
    .populate('ajouteur', 'nom prenom')

    .populate('repEntreprise', 'nom prenom')
    .populate('tuteur', 'nom prenom')
    .populate('rapporteur', 'nom prenom')
    .populate('etudiant', 'nom prenom numeroEtudiant')
        .populate('noteStage', 'valeur commentaire')
    .then(stages => res.status(200).json(stages))
    .catch(error => res.status(404).json({ error }));
  });
  
/**
 * @api {get} /stage/:id Get a Stage
 * @apiName GetOneStage
 * @apiGroup Stage
 *
 * @apiParam {Number} id Stage's unique ID.
 *
 */
exports.getOneStage = ((req, res, next) => {
    Stage.findOne({
        _id: req.params.id
    })
    .populate('commentaires')
    .populate('ficheSuivi')
    .populate('noteStage')
    .populate('visiteStage')
    .populate('fichier')
    .populate('entreprise')
    .populate('parcours', 'acronyme')
    .populate('ajouteur', 'nom prenom')
    .populate('repEntreprise', 'nom prenom')
    .populate('tuteur', 'nom prenom')
    .populate('rapporteur', 'nom prenom')
    .populate('etudiant', 'nom prenom numeroEtudiant')
        .populate('noteStage', 'valeur commentaire')

  .then(stage => res.status(200).json(stage))
  .catch(error => res.status(404).json({ error }))
});




// changement de l'état du stage
exports.editState = (req, res, next) => {
  var stage;
  if(req.body.etat == 'valide'){
    stage = {
      etat: req.body.etat,
      dateValide: req.body.etat == 'valide' ? new Date() : null,
      ...req.body
    };
  }else{
    stage = {
      etat: req.body.etat,
      ...req.body
    };
  }
  
  console.log(stage);
  Stage.updateOne({_id: req.params.id}, stage)
      .then(() => {
          res.status(201).json({
              message: 'Changement de l\'état du stage : '+ req.params.id + ' -> le nouvel état est [' + req.body.etat +']'
          });
      })
      .catch((error) => {
          res.status(400).json({error: error});
      });
};

/**
 * @api {get} /stage Get Stage by keyword
 * @apiName getStageByKeyword
 * @apiGroup Stage
 */
exports.getStageByKeyword = ((req, res, next) => {

  let keyword = req.params.keyword;

  Stage.find(
    {
      /*
      "titre": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "entreprise.nomComplet": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "parcours.nomComplet": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "etat": {$regex: `^.*${keyword}.*$`, $options: "i"}
    */
    }
  )
  .then(stages => res.status(200).json(stages))
  .catch(error => res.status(404).json({ error }));
});

/**
 * @api {post} /stage Create a new Stage
 * @apiName CreateStage
 * @apiGroup Stage
 */
exports.createStage = (req, res, next) => {
    console.log(req.body.data);
    let stage = new Stage();
    if(req.files) {
        const stageobject = JSON.parse(req.body.data);
        delete stageobject._id;
         stage = new Stage({
            ...stageobject,
            fichier: `${req.protocol}://${req.get('host')}/docs/${req.files[0].filename}`
        });
    } else {
       stage = new Stage({
            etat: req.body.etat,

            titre: req.body.titre,
            description: req.body.description,
            duree: req.body.duree,

            dateDebut: req.body.dateDebut,
            datePropose: req.body.datePropose,
            dateValide: req.body.dateValide,

            rapport: req.body.rapport,
            resume: req.body.resume,

            niveauRequis: req.body.niveauRequis,
            conditions: req.body.conditions,
            objectifs: req.body.objectifs,
            competences: req.body.competences,

            salaire: req.body.salaire,
            avantages: req.body.avantages,

            commentaires: [], // lors de la création du stage, il n'y a aucun commentaire

            ficheSuivi: req.body.ficheSuivi,
            noteStage: req.body.noteStage,
            visiteStage: req.body.visiteStage,
            fichier : [],
            parcours: req.body.parcours,
            entreprise: req.body.entreprise,

            ajouteur: req.body.ajouteur,
            repEntreprise: req.body.repEntreprise,
            tuteur: req.body.tuteur,
            rapporteur: req.body.rapporteur,
            etudiant: req.body.etudiant,
        });
    }
    stage.save()
            .then(() => {
                res.status(201).json({
                    message: 'Création du stage réussie !',
                    idStage: stage._id
                });
            })
            .catch((error) => {
                res.status(400).json({error: error});
            });
    };


exports.addCommentOnStage = (req,res,next) => {
    const comment = new Commentaire({
        idUser: req.body.idUser,
        dateCommentaire : new Date(),
        message: req.body.message
    });

    comment.save()
        .then(() => {
            const stage = {
                $push: {commentaires :comment._id},
            }
            Stage.updateOne({_id: req.params.id}, stage)
                .then(() => {
                    res.status(201).json({
                        message: 'Ajoute d\'un commentaire sur le stage : ['+ req.params.id +']',
                        idCommentaire : comment._id
                    });
                })
                .catch((error) => {
                    res.status(400).json({message: 'Une erreur est survenu lors de l\'update du stage ',error: error});
                });
        })
        .catch((error) => {
            res.status(400).json({error: error});
        });
};

exports.deleteCommentOneStage = (req, res, next) => {
    Commentaire.deleteOne({_id: req.params.idComment}).then(
        () => {
            res.status(200).json({
                message: 'Comment on stage deleted!'
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

exports.addNote = (req,res,next) => {
    const laDate = new Date();
    console.log(req)
    console.log(req.body)

    const laNote = new note({
        date : laDate,
        valeur: req.body.valeur,
        commentaire : req.body.commentaire
    })
    laNote.save()
        .then(()=>{
            const stage = {
                noteStage:laNote._id,
            }
            Stage.updateOne({_id: req.params.id}, stage)
                .then(() => {
                    res.status(201).json({
                        message: 'ajoute de la note '+req.body.valeur +' sur  : '+ req.params.id +']'

                    });
                })
                .catch((error) => {
                    res.status(400).json({error: error});
                });
        })
        .catch((error) => {
            res.status(400).json({error: error});
        });

}


exports.addPJ= (req,res,next) => {
    const ladate = new Date();
    const pj = new PJ({
        ...JSON.parse(req.body.data),
        nom: req.files[0].originalname.substring(0,req.files[0].originalname.indexOf('.')),
        type:req.body.type,
        extension:req.files[0].originalname.substring(req.files[0].originalname.lastIndexOf('.') + 1),
        chemin : `${req.protocol}://${req.get('host')}/docs/${req.files[0].filename}`,
        size:req.files[0].size,
        annee:ladate.getFullYear(),
        idStage : req.params.id
    });
    pj.save()
        .then(() => {
            const stage = {
                $push: {fichier :pj._id},
            }
            Stage.updateOne({_id: req.params.id}, stage)
                .then(() => {
                    res.status(201).json({
                        message: 'ajoute de la piece jointe du stage : '+ req.params.id +']'
                    });
                })
                .catch((error) => {
                    res.status(400).json({error: error});
                });
        })
        .catch((error) => {
            res.status(400).json({error: error});
        });



}

    /**
     * @api {put} /stage/:id Edit a Stage
     * @apiName EditStage
     * @apiGroup Stage
     *
     * @apiParam {Number} id Stage's unique ID.
     */
    exports.editStage = (req, res, next) => {
        console.log(req.body);
        console.log(req.files);

        const stage  =
        /*= req.files ?
            {
                ...JSON.parse(req.body.data),
                fichier: `${req.protocol}://${req.get('host')}/docs/${req.files[0].filename}`,
                _id: req.params.id
            } : */{
                ...req.body,
                _id: req.params.id
            }
        console.log(stage);


        Stage.updateOne({_id: req.params.id}, stage)
            .then(() => {
                res.status(201).json({
                    message: 'Stage updated successfully!'
                });
            })
            .catch((error) => {
                res.status(400).json({error: error});
                console.log({error: error});
            });
    };

    /**
     * @api {delete} /stage Delete a stage
     * @apiName DeleteOneStage
     *
     * @apiGroup Stage
     *
     * @apiParam {Number} id Stage's unique ID.
     */
    exports.deleteOneStage = (req, res, next) => {
        Stage.deleteOne({_id: req.params.id}).then(
            () => {
                res.status(200).json({
                    message: 'Stage deleted!'
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

    /**
     * @api {delete} /stage Delete all stages
     * @apiName DeleteAllStage
     * @apiGroup Stage
     *
     */
    exports.deleteAllStage = (req, res, next) => {
        Stage.deleteMany({}).then(
            () => {
                res.status(200).json({
                    message: 'All Stages deleted!'
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

