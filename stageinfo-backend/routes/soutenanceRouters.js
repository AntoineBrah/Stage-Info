const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const soutenanceCtrl = require('../controllers/soutenanceController');

router.get('/:id', Etudiant,soutenanceCtrl.getOneSoutenance);
router.get('/', invite,soutenanceCtrl.getAllSoutenance);
router.post('/', Admin,soutenanceCtrl.createSoutenance);
router.put('/:id',Admin, soutenanceCtrl.editSoutenance);
router.delete('/:id', Admin,soutenanceCtrl.deleteOneSoutenance);
router.delete('/', Admin,soutenanceCtrl.deleteAllSoutenance);

module.exports = router;
