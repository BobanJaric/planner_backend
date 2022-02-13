const express =require('express');

const router = express.Router();

const aircraftControllers = require('../controllers/aircraft-controllers');

router.post('/',aircraftControllers.createAircraft);
router.get('/',aircraftControllers.getAircraft);

router.get('/:aid',aircraftControllers.getAircraftById );

router.patch('/:aid', aircraftControllers.updateAircraft);  

module.exports = router;