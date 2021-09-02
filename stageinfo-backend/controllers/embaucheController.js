const Embauche = require('../models/embaucheModel');


/**___________________________CCREATION D'EMBAUCHE________________________**/

exports.createEmbauche = (req,res, next) => {
    const embauche = new Embauche({
        ...req.body
    });
    embauche.save()
        .then(() => {
            res.status(201).json({message: 'embauche created!'})
        })
        .catch((error) => { res.status(400).json({ error: error});});
};

/**______________________SELECTION EMBAUCHE______________________________**/

exports.getAllEmbauche = (req,res,next) => {
    Embauche.find()
        .then(embauche => res.status(200).json(embauche))
        .catch(error =>res.status(400).json({error}));
};

exports.getOneEmbauche = (req,res,next)=>{
    Embauche.findOne({_id: req.params.id})
        .then(embauche => res.status(200).json(embauche))
        .catch(error =>res.status(400).json({error}));
};

/**______________________MODFICATION___EMBAUCHE____________**/


exports.editEmbauche = (req, res, next) => {
    const embauche = new Embauche({
        _id: req.params.id,
        ...req.body
    });
    Embauche.updateOne({_id: req.params.id}, embauche)
        .then(() => {
            res.status(201).json({
                message: 'Embauche updated successfully!'
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};
/**_________________SUPPRESSION___________________EMBAUCHE**/


exports.deleteOneEmbauche = (req, res, next) => {
    Embauche.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({
                message: 'Embauche DELETED!'
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};
exports.deleteAllEmbauche = (req, res, next) => {
    Embauche.deleteMany( {} )
        .then(() => {
            res.status(200).json({
                message: 'ALL EMBAUCHES DELETED!'
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};
