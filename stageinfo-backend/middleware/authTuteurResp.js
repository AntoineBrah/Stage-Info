const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        if(req.body.userId && req.body.userId !== userId){
            throw 'user id non valable !';
        } else {
            if(role != "admin" && role!="repEntreprise" && role!="tuteur" && role!="respParcours" && role != "respStage " && role != "secretaire"){
                res.status(401).json({ message: "vous n'avez pas le droit d'accéder a cette requête.", error : error})}
            next();
        }
    }
    catch (error){
        res.status(401).json({ message: 'Requête non auth !', error : error})
    }

};
