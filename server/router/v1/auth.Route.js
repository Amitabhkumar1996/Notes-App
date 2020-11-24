const router = require('express').Router();

const {create_user,login_user} = require('../../controller/authController');

router.post("/registration",create_user);

router.post("/login",login_user);




module.exports = router;