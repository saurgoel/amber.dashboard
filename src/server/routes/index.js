import {omit} from 'underscore';
import {Router} from 'express';
import config from '../config';

var router = new Router();

var index_handler = (req, res)=> {
	res.render('index', {});
};

var config_handler = (req, res)=> {
	let blacklist = ['port']
	res.json(omit(config, ...blacklist));
};



// Test
router.get('/echo', (req, res)=> res.send('Echo Route'));


router.get('/config', config_handler);
router.get('*', index_handler);

export default router;