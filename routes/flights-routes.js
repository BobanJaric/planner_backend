const express =require('express');

const { check} = require('express-validator');

const flightsControllers = require('../controllers/flights-controllers');

 const checkAuth = require('../middleware/check-auth'); 

const router = express.Router();



router.use(checkAuth); 

router.get('/:pid',flightsControllers.getFlightById );
router.get('/dates/:pd',flightsControllers.getFlightsByDate );
router.get('/user/:uid',flightsControllers.getFlightsByUserId );
router.post('/', flightsControllers.createFlight);
router.post('/mobapp/', flightsControllers.createFlightFlutter);
router.patch('/:pid',flightsControllers.updateFlight);
router.patch('/mobapp/:pid', flightsControllers.updateFlightFlutter);
router.delete('/:pid',flightsControllers.deleteFlight);

router.post('/sales' , flightsControllers.createSales);
router.post('/ops' , flightsControllers.createOps);

 

router.post('/airports',
[
    check('icao')
    .not()
    .isEmpty(),
    check('iata')
    .not()
    .isEmpty(),
     check('country'), 
     check('city'), 
    check('hendler1').not().isEmpty()
] , flightsControllers.createAirport);
router.get('/airports/all', flightsControllers.getAirports );
router.get('/airportsDatas/all', flightsControllers.getAirportsDatas );
router.get('/airports/:aid', flightsControllers.getAirportById );
router.get('/airport/:nid', flightsControllers.getAirportByName );
router.get('/airports/gerpmt/:nid3', flightsControllers.getAirportByName3 );
router.patch('/airports/:aid', flightsControllers.updateAirport );

router.post('/note', flightsControllers.createNote);
router.delete('/notes/delete/:nid',flightsControllers.deleteNote); 

module.exports = router;
