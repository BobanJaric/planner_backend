const express =require('express');

const router = express.Router();


const notesControllers = require('../controllers/notes-controllers');

router.get('/', notesControllers.getNotes );

module.exports = router;