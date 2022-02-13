const express =require('express');

const router = express.Router();

const newsControllers = require('../controllers/news-controllers');

router.post('/',newsControllers.createNews);
router.get('/',newsControllers.getNews);

router.get('/:nid',newsControllers.getNewsById );
router.delete('/:nid',newsControllers.deleteNews );

router.patch('/:nid', newsControllers.updateNews);  

module.exports = router;