const router = require('express').Router();
const indexController = require('./index.controller')

router.get('/', indexController.redirectFrontendHome);

module.exports = router;