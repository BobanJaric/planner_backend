const express =require('express');

const router = express.Router();

const crewControllers = require('../controllers/crew-controllers');

router.post('/',crewControllers.createCrew);
router.get('/',crewControllers.getCrew);

router.get('/crewby/:crid',crewControllers.getCrewById );

router.patch('/:crid', crewControllers.updateCrew);  

module.exports = router;