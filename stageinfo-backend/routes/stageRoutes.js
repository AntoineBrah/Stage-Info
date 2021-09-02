const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');
const multer = require('../middleware/multer-config')

router.get('/',invite, stageCtrl.getAllStage);
router.get('/:id', invite, stageCtrl.getOneStage);
router.post('/',Etudiant,multer, stageCtrl.createStage);
router.put('/:id', Etudiant,multer,stageCtrl.editStage);
router.delete('/:id',Admin, stageCtrl.deleteOneStage);
router.delete('/', Admin, stageCtrl.deleteAllStage);

// changement d'état d'un stage
router.put('/:id/changement-etat', TuteurResp,stageCtrl.editState); // le responsable des stage peut modifier

router.get('/related/:id', invite, stageCtrl.getAllStageRelatedToUser);
router.put('/:id/add-pj',Etudiant,multer,stageCtrl.addPJ);
router.put('/:id/add-note',TuteurResp,stageCtrl.addNote)

// ajouter un commentaire sur le stage
router.put('/:id/comment',Etudiant,stageCtrl.addCommentOnStage);
//supprimer un commentaire
router.delete('/:id/comment/:idComment',Etudiant,stageCtrl.deleteCommentOneStage);

module.exports = router;
