const PieceJointe = require('../models/pieceJointeModel');
const fs = require('fs');

/**-----------------INSERTION DE PIECE______________________*/
exports.createPieceJointe = (req, res, next) => {
    const piecejointe = new PieceJointe({
        ...req.body
    });
    piecejointe.save()
        .then(() => {
            res.status(201).json({message: 'piece created!'})
        })
        .catch((error) => { res.status(400).json({ error: error});});
};
/**_______________________SELECTION DES PIECES_________________*/

exports.getAllPieceJointe =(req,res,next )=>{
    PieceJointe.find()
        .then(pieces => res.status(200).json(pieces))
        .catch(error =>res.status(400).json({error}));
};

exports.getOnePieceJointe = (req, res,next) => {
    PieceJointe.findOne({ _id: req.params.id})
        .then(piece => res.status(200).json(piece))
        .catch(error => res.status(404).json(error));

};
/***_______________________MODIFICATION DES PIECES________________*/

exports.editPieceJointe = (req, res, next) => {
    const piecejointe = new PieceJointe({
        _id: req.params.id,
        nom: req.files[0].originalname,
        chemin: `${req.protocol}://${req.get('host')}/docs/${req.files[0].filename}`
    });
    PieceJointe.findOne({_id: req.params.id})
        .then((PJ) => {
            const filename = PJ.chemin.split('/docs/')[1];
            fs.unlink(`docs/${filename}`, () => {
            });
        });

    PieceJointe.updateOne({_id: req.params.id}, piecejointe)
        .then(() => {
            res.status(201).json({
                message: 'piece updated successfully!'
            });
        })
        .catch((error) => {
            res.status(400).json({error: error});
        });
};


/**__________________SUPPRESSION DES PIECES________________________**/

exports.deleteOnePieceJointe = (req, res, next) => {
    PieceJointe.findOne({_id: req.params.id})
        .then((PJ) => {
            const filename = PJ.chemin.split('/docs/')[1];
            fs.unlink(`docs/${filename}`,() =>{
                PieceJointe.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'objet supprimé'}))
                    .catch(error => res.status(400).json({error}));
            });
        } )
        .catch((error) => { res.status(400).json({ error: error});});
};

exports.deleteAllPieceJointe = (req, res, next) => {
  PieceJointe.deleteMany({})
      .then(() => {
          res.status(200).json({
              message: 'ALL PIECES DELETED!'
          });
      })
      .catch((error) => { res.status(400).json({ error: error});});

};
