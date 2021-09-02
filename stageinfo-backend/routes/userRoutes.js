const express = require('express');
const  router = express.Router();
const userctrl = require ('../controllers/userControllers');

router.get('/', userctrl.getAllUser);
router.get('/:id', userctrl.getOneUser);
router.get('/role/:role', userctrl.getAllUserByRole);
router.get('/getuser/:role', userctrl.getAllUserByRole);

router.post('/forgotpassword',userctrl.forgotPassword);
router.post('/',userctrl.addUser);
router.post('/signup',userctrl.addUser);
router.post('/login',userctrl.login);
router.put('/:id', userctrl.editUser);
router.post('/sendemail',userctrl.sEmail);


router.delete('/:id', userctrl.deleteOneUser);
router.delete('/',userctrl.deleteall)

router.get('/email/:id', userctrl.getemail);
router.get('/role/:id', userctrl.getRole);




module.exports = router;
