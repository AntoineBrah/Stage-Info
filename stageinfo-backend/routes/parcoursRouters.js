const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const parcoursCtrl = require('../controllers/parcoursController');

router.get('/', invite,parcoursCtrl.getAllParcours);
router.get('/:id' ,invite, parcoursCtrl.getOneParcours);
router.post('/', Admin,parcoursCtrl.createParcours);
router.put('/:id',Admin, parcoursCtrl.editParcours);
router.delete('/:id',Admin, parcoursCtrl.deleteOneParcours);

module.exports = router;
