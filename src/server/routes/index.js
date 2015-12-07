import {Router} from 'express';

var router = new Router();

var index = (req, res)=> {
	res.render('index', {});
}


// Test
router.get('/echo', (req, res)=> res.send('Echo Route'));



router.get('*', index);

export default router;