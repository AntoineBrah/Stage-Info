const  express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const embaucheCtrl = require('../controllers/embaucheController');

router.get('/',Etudiant, embaucheCtrl.getAllEmbauche);
router.get('/:id',Etudiant, embaucheCtrl.getOneEmbauche);
router.post('/',Admin, embaucheCtrl.createEmbauche);
router.put('/:id', Admin,embaucheCtrl.editEmbauche);
router.delete('/:id', Admin,embaucheCtrl.deleteOneEmbauche);
router.delete('/', Admin,embaucheCtrl.deleteAllEmbauche);

module.exports = router;
