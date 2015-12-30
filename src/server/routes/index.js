import {omit} from 'underscore';
import {Router} from 'express';
import config from '../config';

var router = new Router();

var index_handler = (req, res)=> {
	res.render('index', {});
};

var config_handler = (req, res)=> {
	let blacklist = ['port', 'bsPort', 'serverPort', 'accounts_api_internal_url'];

	let safe = {
		...omit(config, blacklist),
		user: req.session.user
	};

	res.json(safe);
};



// Test
router.get('/echo', (req, res)=> res.send('Echo Route'));


router.get('/config', config_handler);
router.get('*', index_handler);

export default router;