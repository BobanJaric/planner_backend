const express = require('express');

/* const checkAuth = require('../middleware/check-auth'); */

const router = express.Router();
/* router.use(checkAuth); */

const arhiveControllers = require('../controllers/arhive-controllers');

router.post('/flights', arhiveControllers.createArhive);
router.get('/', arhiveControllers.getArhive);

router.get('/:areg', arhiveControllers.getArhiveByReg);

module.exports = router;