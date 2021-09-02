const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const salleCtrl = require('../controllers/salleController');

router.get('/:id',Etudiant, salleCtrl.getOneSalle);
router.get('/', Etudiant,salleCtrl.getAllSalle);
router.post('/', Admin,salleCtrl.createSalle);
router.put('/:id', Admin,salleCtrl.editSalle);
router.delete('/:id', Admin,salleCtrl.deleteOneSalle);
router.delete('/', Admin,salleCtrl.deleteAllSalle);

module.exports = router;
