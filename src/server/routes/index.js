import {Router} from 'express';

var router = new Router();


router.get('/', (req, res)=>{
	res.render('index', {});
});
// router.get('/', (req, res)=> res.send('Home Route'));
router.get('/echo', (req, res)=> res.send('Echo Route'));

export default router;