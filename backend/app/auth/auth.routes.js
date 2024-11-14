const router = require('express').Router();
const authController = require('./auth.controller');

router.post('/', authController.signup)
// router.put('/signout', authController.signOut)
router.put('/', authController.signin)

module.exports = router;