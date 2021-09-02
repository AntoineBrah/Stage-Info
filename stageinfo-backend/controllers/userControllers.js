
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const nodemailer = require("nodemailer");
async function SendEmail(email,titre,message) {

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'plateformestage2021@gmail.com', // generated ethereal user
            pass: 'FDS2021.', // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: 'StageInfo', // sender address
        to: email, // list of receivers
        subject: titre, // Subject line

        html:message, // html body
    });

    console.log("Message sent: %s to %s", info.messageId,email);

}


exports.sEmail = ((req,res, next) => {


    SendEmail(req.body.email,req.body.titre,req.body.message)
        .then( users => res.status(200).json())
        .catch(error => res.status(350).json({ message: 'mail de confirmation non envoyé' }));
})

exports.getAllUser = ((req, res, next) => {
    User.find()
        .populate('entreprise', 'nom')
        .populate('parcours', 'acronyme')
        .then(users => res.status(200).json(users))
        .catch(error => res.status(404).json({ error }));
});

exports.getOneUser = ((req, res, next) => {
    User.findOne({
      _id: req.params.id
    })
    .populate('entreprise', 'nom')
    .populate('parcours', 'acronyme')
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
  });

/**
 * @api {get} /api/user/role/:role Get a user by role
 * @apiName getAllUserByRole
 * @apiGroup User
 *
 * @apiParam {string} role User's
 *
 */
 exports.getAllUserByRole = ((req, res, next) => {
    User.find({
        role: req.params.role
    })
    .populate('entreprise', 'nom')
    .populate('parcours', 'acronyme')
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
});


exports.addUser = (req, res, next) =>{
    delete req.param._id;
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user =new User({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                hash: hash,
                role: req.body.role,
                parcours: req.body.parcours,
                numeroEtudiant: req.body.numeroEtudiant,
                promotion: req.body.promotion,
                fax: req.body.fax,
                telephone: req.body.telephone,
                fonction:req.body.fonction,
                entreprise: req.body.entreprise
                
                
            });
            user.save()
                .then(() => {res.status(201).json({message: 'Utilisateur crée!', idUser: user._id})
                    SendEmail(user.email,'Création de compte StageINfo', 'Bonjour '+user.nom+', <br> Votre compte Stage info a été crée avec success' +
                        ' <br> Email : '+user.email+'<br> Mot de passe :'+req.body.password + '<br>Pensez à modifié votre mot de passe,cordialement! ')

                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));

};


exports.login= (req, res, next) =>{
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(402).json({error : 'Utilisateur non trouvé !!'})
            }
            bcrypt.compare(req.body.password, user.hash)
                .then(valid => {
                    if (!valid) {
                        return res.status(402).json({error : 'Mot de passe Incorrect !!'})

                    }
                    res.status(200).json({
                        userId: user._id,
                        role:user.role,
                        token: jwt.sign(
                            {userId: user._id,role:user.role,email: user.email},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.getemail = ((req, res, next) => {
    User.findOne({
        _id: req.params.id
    })
        .then(User => res.status(200).json(User.email),
        console.log(User))
        .catch(error => res.status(404).json({ error }))
});

exports.getRole = ((req, res, next) => {
    User.findOne({
        _id: req.params.id
    })
        .then(User => res.status(200).json(User.role),
        console.log(User))
        .catch(error => res.status(404).json({ error }))
});


/**
 * @api {put} /auth/:id Edit a User
 * @apiName EditUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 */
 exports.editUser = ((req, res, next) => {


    const user = new User({
        _id: req.params.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        role: req.body.role,
        parcours: req.body.parcours,
        numeroEtudiant: req.body.numeroEtudiant,
        promotion: req.body.promotion,
        fax: req.body.fax,
        telephone: req.body.telephone,
        fonction:req.body.fonction,
        entreprise: req.body.entreprise
    });

    User.updateOne({_id: req.params.id}, user)
       .then(() => {
           res.status(201).json({
               message: 'User updated successfully'
           });
       })
       .catch((error) => {
           res.status(400).json({
               error : error
           });
       });
});

/**
 * @api {delete} /user Delete a user
 * @apiName DeleteOneUser
 * 
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 */
 exports.deleteOneUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'User deleted!'
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
exports.forgotPassword = ((req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .then(user =>
        { if(user._id != null) {
            const ok = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN@!#$*&+-';
            let pass = '';
            let longueur = 10;
            for (i = 0; i < longueur; i++) {
                let wpos = Math.round(Math.random() * ok.length);
                pass += ok.substring(wpos, wpos + 1);
            }
            bcrypt.hash(pass, 10)
                .then(hash => {


                        User.updateOne({_id: user._id}, {
                            _id: user._id,
                            hash: hash
                        })
                            .then(() => {
                                res.status(201).json({
                                    message: 'User updated successfully'
                                }),
                                    SendEmail(user.email, 'Demande de réinitialisation du mot de passe StageInfo',
                                        'Bonjour ' + user.nom + ',<br>Vous avez demandez une réinitialisation du mot de passe voici votre nouveau mot de passe : ' + pass + '<br>Pensez à modifié votre mot de passe,cordialement! ');
                            })
                            .catch((error) => {
                                res.status(400).json({
                                    error: error
                                });
                            });
                    }
                )
        }else {res.status(409).json({message:'mail inexistant !! '})}





        }
        )
        .catch(error => res.status(409).json({message:'mail inexistant !! '}))
});
exports.deleteall = (req, res, next) => {
    User.deleteMany({}).then(
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


