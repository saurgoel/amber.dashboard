import request from 'request';
import config from '../config';

const TokenValidator = (req, res, next)=>{
	var token = req.cookies.auth_token || null;
	var host  = __DEV__
		? req.get('host').replace(config.serverPort, config.bsPort)
		: req.get('host');

	var validateURL = `${__DEV__ ? config.accounts_api_url : config.accounts_api_internal_url}/auth/accounts/validate?auth_token=${token}`;
	var redirectURL = `${config.accounts_api_url}/?redirect_to=${req.protocol}://${host+req.originalUrl}`;

	request(validateURL, function(err, response, body) {
		var valid = false;
		if(!err && response.statusCode == 200) {
			var user = JSON.parse(body).data;
			req.session.user = user;
			valid = true;
		}

		res.format({
			html: ()=> {
				if (err) { next(err); }
				else if (valid){ next(); }
				else { res.redirect(redirectURL) }
			},
			json: ()=> {
				if (err) { next(err); }
				else if (valid){ next(); }
				else { res.json({status: 'error', message: 'Invalid Token'}) }
			},
			text: ()=> {
				if(err) { next(err); }
				else if(valid) { next(); }
				else { res.send("error: Invalid Token"); }
			}
		});
	});
};


export default TokenValidator;