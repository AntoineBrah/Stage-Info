const express = require ('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const pieceJointeCtrl = require('../controllers/pieceJointeController');
const multer = require('../middleware/multer-config')

router.get('/',Admin,pieceJointeCtrl.getAllPieceJointe);
router.get('/:id',invite, pieceJointeCtrl.getOnePieceJointe);
router.post('/',Etudiant, pieceJointeCtrl.createPieceJointe);
router.put('/:id', Etudiant,multer,pieceJointeCtrl.editPieceJointe);
router.delete('/:id',Admin, pieceJointeCtrl.deleteOnePieceJointe);
router.delete('/',Admin,pieceJointeCtrl.deleteAllPieceJointe);

module.exports = router;
