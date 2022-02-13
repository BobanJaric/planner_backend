const express =require('express');
const { check} = require('express-validator');

const pdfControllers = require('../controllers/pdf-controllers');

const router = express.Router();

router.post('/',
[
    check('startDate')
    .not()
    .isEmpty(),
     check('origin').isLength({min: 4, max:4}), 
     check('destination').isLength({max:4}), 
    check('aircraft').not().isEmpty()
] ,
pdfControllers.createPdf );  

module.exports = router;
