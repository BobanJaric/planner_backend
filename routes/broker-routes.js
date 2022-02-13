const express =require('express');

/* const checkAuth = require('../middleware/check-auth'); */

const router = express.Router();
/* router.use(checkAuth); */


const brokerControllers = require('../controllers/broker-controllers');

router.post('/',brokerControllers.createBroker);
router.get('/',brokerControllers.getBroker);

router.get('/:bid',brokerControllers.getBrokerById );

router.patch('/:bid', brokerControllers.updateBroker);  

module.exports = router;