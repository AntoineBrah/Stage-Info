const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const creneauCtrl = require('../controllers/creneauController');

router.get('/',Etudiant, creneauCtrl.getAllCreneau);
router.get('/:id',Etudiant, creneauCtrl.getOneCreneau);
router.post('/', Admin,creneauCtrl.createCreneau);
router.put('/:id', Admin,creneauCtrl.editCreneau);
router.delete('/:id',Admin, creneauCtrl.deleteOneCreneau);
router.delete('/', Admin,creneauCtrl.deleteAllCreneau);

module.exports = router;
