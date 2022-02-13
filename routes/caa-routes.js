const express =require('express');

const router = express.Router();

const caaControllers = require('../controllers/caa-controllers');

router.post('/',caaControllers.createCaa);
router.get('/',caaControllers.getCaa);


router.get('/:cname',caaControllers.getCaaByName );
router.get('/caaby/:cid',caaControllers.getCaaById );

router.patch('/:cid', caaControllers.updateCaa);  

module.exports = router;